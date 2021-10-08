import React, { useEffect, useState } from 'react'
import './AddWorkout.scss'
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { WodTypes } from '../../../../Utils/Constants'
import worksService from '../../../../Service/works'
import { IconButton } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

const weightLiftingSessionDefault = [
  { sets: '2', repetitions: '5', percentaje: 50 },
  { sets: '2', repetitions: '5', percentaje: 60 },
  { sets: '2', repetitions: '4', percentaje: 70 },
  { sets: '2', repetitions: '3', percentaje: 75 },
  { sets: '2', repetitions: '3', percentaje: 80 },
  { sets: '2', repetitions: '2', percentaje: 85 },
]

export const AddWorkout = (props) => {
  const { addWorkout, setAddWorkout, setFetchingWorkout } = props
  const [loading, setLoading] = useState(false)
  const [weightForm, setWeightForm] = useState(false)
  const [weightLiftingSession, setWeightLiftingSession] = useState(weightLiftingSessionDefault)
  // const [weight, setWeight] = useState(0)
  const { register, errors, handleSubmit, control, watch, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    const category = watch('category')
    if (category && category.description === 'Weightlifting') {
      setWeightForm(true)
    } else {
      setWeightForm(false)
    }
  }, [watch])

  useEffect(() => {
    if (addWorkout.update && addWorkout.workout) {
      setWeightLiftingSession(addWorkout.workout.weightLiftingSession)
      setValue(
        'category',
        WodTypes.find((w) => w.id === addWorkout.workout.wodType),
      )
      setValue('workoutTime', addWorkout.workout.workoutTime)
      setValue('workoutDescription', addWorkout.workout.workoutDescription)
    }
  }, [addWorkout.update])

  const sendData = async (data) => {
    try {
      setLoading(true)
      data.wodType = data.category.id
      delete data.category
      if (weightForm) {
        data.weightLiftingSession = weightLiftingSession
      }
      if (addWorkout.update) {
        data.workoutID = addWorkout.workout._id
        await worksService.updateWorkout(data)
      } else {
        let dayID
        data.date = addWorkout.item.dateDay

        const result = addWorkout.workoutWeek.find(
          (w) => new Date(w.date).toUTCString() === new Date(data.date).toUTCString(),
        )
        // if (weightForm) {
        //   if (!weight) {
        //     setLoading(false)
        //     return false
        //   }
        //   data.weight = weight
        //   data.weightLifting = await calculateTotalWeight()
        // }

        if (!result) {
          const workoutDay = await worksService.createDay({
            date: data.date,
            groupID: addWorkout.selectedGroup.id,
          })
          dayID = workoutDay.id
        } else {
          dayID = result.id
        }
        data.dayID = dayID
        await worksService.createWorkout(data)
      }

      setLoading(false)
      setFetchingWorkout((prev) => !prev)
      setAddWorkout((prev) => ({ ...prev, showModal: false }))
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  // const handleChangeWeight = event => {
  //   setWeight(event.target.value)
  // }

  const handleWeightLiftingSession = (index) => (e) => {
    const newArr = [...weightLiftingSession]
    newArr[index] = {
      ...newArr[index],
      [e.target.name]: e.target.name === 'percentaje' ? parseInt(e.target.value) : e.target.value,
    }
    setWeightLiftingSession(newArr)
  }

  // const calculateTotalWeight = async () => {
  //   const newArr = [...weightLiftingSession]
  //   weightLiftingSession.map((item, index) => {
  //     newArr[index] = { ...newArr[index], total: parseFloat(weight * item.percentage / 100) }
  //   })

  //   return newArr
  // }

  const addColWeightLifting = (index) => {
    const array = [...weightLiftingSession]
    array.splice(index + 1, 0, { sets: '0', repetitions: '0', percentaje: 0 })
    setWeightLiftingSession(array)
  }
  const deleteColWeightLifting = (index) => {
    const array = [...weightLiftingSession]
    array.splice(index, 1)
    setWeightLiftingSession(array)
  }

  return (
    <>
      <Modal
        show={addWorkout.showModal}
        onHide={() => (loading ? setAddWorkout((prev) => ({ ...prev, showModal: false })) : null)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {addWorkout.update ? 'Actualizar' : 'Agregar'} workout {!addWorkout.update ? 'a' : ''}{' '}
            {addWorkout.update
              ? addWorkout.workout.title
                ? addWorkout.workout.title
                : WodTypes.find((w) => w.id === addWorkout.workout.wodType).description
              : addWorkout.item.description}{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((e) => {
              sendData(e)
            })}
          >
            <Form.Group controlId="ProductCategory">
              <Form.Control
                ref={register({ required: true })}
                type="text"
                placeholder="Titulo"
                name="title"
                className={`form-input ${errors.title ? 'active' : 'disable'}`}
              />
              <Controller
                as={Select}
                options={WodTypes}
                defaultValue={null}
                placeholder="Categoría"
                getOptionLabel={(option) => option.description}
                getOptionValue={(option) => option.id}
                // value={getValues('categories')}
                onChange={([option]) => option.id}
                name="category"
                rules={{ required: true }}
                control={control}
                className={`select ${errors.category ? 'active' : 'disable'}`}
              />
              {errors.category?.type === 'required' && <span>Este Campo es Requerido</span>}
            </Form.Group>
            <Form.Control
              ref={register()}
              type="number"
              placeholder="Tiempo"
              name="workoutTime"
              className={`form-input ${errors.workoutTime ? 'active' : 'disable'}`}
            />
            {weightForm ? (
              <div className="weight-container">
                {/* <Form.Group controlId='ProductCategory'>
                  <Form.Control
                    type='text'
                    placeholder='Peso en kilos'
                    name='weight'
                    value={weight}
                    onChange={handleChangeWeight}
                    className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                  />
                </Form.Group> */}
                <Form.Control
                  ref={register()}
                  type="text"
                  placeholder="Descripción WeightLifting "
                  name="weightLiftingDescription"
                  className={`form-input ${errors.weightLiftingDescription ? 'active' : 'disable'}`}
                />
                <Row>
                  <Col md={1} />
                  <Col md={3}>
                    <p>Sets</p>
                  </Col>
                  <Col md={3}>
                    <p>Reps</p>
                  </Col>
                  <Col md={3}>
                    <p>%</p>
                  </Col>
                  <Col md={1} />
                  {/* <Col md={3}>
                    <p>Kilos</p>
                  </Col> */}
                </Row>
                {weightLiftingSession.map((item, index) => (
                  <Row key={index}>
                    <Col md={1}>
                      <IconButton onClick={() => deleteColWeightLifting(index)}>
                        <HighlightOffIcon />
                      </IconButton>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="text"
                        placeholder="Sets"
                        value={item.sets}
                        name="sets"
                        onChange={handleWeightLiftingSession(index)}
                        className={`form-input ${errors.time ? 'active' : 'disable'}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="text"
                        placeholder="Reps"
                        value={item.repetitions}
                        name="repetitions"
                        onChange={handleWeightLiftingSession(index)}
                        className={`form-input ${errors.time ? 'active' : 'disable'}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        name="percentaje"
                        placeholder="%"
                        value={item.percentaje}
                        onChange={handleWeightLiftingSession(index)}
                        className={`form-input ${errors.time ? 'active' : 'disable'}`}
                      />
                    </Col>
                    <Col md={1}>
                      <IconButton onClick={() => addColWeightLifting(index)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Col>
                    {/* <Col md={3}>
                      <p>{weight ? weight * item.percentage / 100 : 0}</p>

                    </Col> */}
                  </Row>
                ))}
              </div>
            ) : null}
            <Form.Control
              ref={register()}
              as="textarea"
              rows={5}
              placeholder="Descripción"
              name="workoutDescription"
              className={`form-text-area ${errors.workoutDescription ? 'active' : 'disable'}`}
            />
            <div className="button-container">
              <Button
                variant="outline-secondary"
                onClick={() => setAddWorkout((prev) => ({ ...prev, showModal: false }))}
                disabled={loading}
              >
                Cerrar
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner
                    animation="border"
                    role="status"
                    size="sm"
                    style={{ marginRight: '0.5rem' }}
                  />
                ) : null}
                {addWorkout.update ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
