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
  { sets: 2, reps: 5, percentage: 50 },
  { sets: 2, reps: 5, percentage: 60 },
  { sets: 2, reps: 4, percentage: 70 },
  { sets: 2, reps: 3, percentage: 75 },
  { sets: 2, reps: 3, percentage: 80 },
  { sets: 2, reps: 2, percentage: 85 },
]

export const AddWorkout = (props) => {
  const { addWorkout, setAddWorkout, setFetching } = props
  const [loading, setLoading] = useState(false)
  const [weightForm, setWeightForm] = useState(false)
  const [weightLiftingSession, setWeightLiftingSession] = useState(weightLiftingSessionDefault)
  // const [weight, setWeight] = useState(0)
  const { register, errors, handleSubmit, control, watch } = useForm({
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

  const sendData = async (data) => {
    try {
      setLoading(true)
      let dayID
      data.date = addWorkout.item.dateDay
      data.wodType = data.category.id
      delete data.category
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
      if (weightForm) {
        data.weightLifting = weightLiftingSession
      }
      if (!result) {
        const workoutDay = await worksService.createDay({ date: data.date })
        dayID = workoutDay.id
      } else {
        dayID = result.id
      }
      data.dayID = dayID
      console.log(data)
      await worksService.createWorkout(data)
      setLoading(false)
      setFetching((prev) => !prev)
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
    newArr[index] = { ...newArr[index], [e.target.name]: parseInt(e.target.value) }
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
    array.splice(index + 1, 0, { sets: 0, reps: 0, percentage: 0 })
    setWeightLiftingSession(array)
  }
  const deleteColWeightLifting = (index) => {
    const array = [...weightLiftingSession]
    array.splice(index, 1)
    setWeightLiftingSession(array)
  }
  console.log(weightLiftingSession)
  return (
    <>
      <Modal
        show={addWorkout.showModal}
        onHide={() => (loading ? setAddWorkout((prev) => ({ ...prev, showModal: false })) : null)}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            Agregar workout a {addWorkout.item.description} {addWorkout.item.numberDay}{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((e) => {
              sendData(e)
            })}
          >
            <Form.Group controlId="ProductCategory">
              <Controller
                as={Select}
                options={WodTypes}
                // defaultValue={product.category || null}
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
              ref={register({ required: true })}
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
                        type="number"
                        placeholder="Sets"
                        defaultValue={item.sets}
                        name="sets"
                        className={`form-input ${errors.time ? 'active' : 'disable'}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        placeholder="Reps"
                        defaultValue={item.reps}
                        name="reps"
                        className={`form-input ${errors.time ? 'active' : 'disable'}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="number"
                        name="percentage"
                        placeholder="%"
                        value={item.percentage}
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
              ref={register({ required: true })}
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
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
