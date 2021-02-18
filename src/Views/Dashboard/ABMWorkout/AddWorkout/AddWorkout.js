import React, { useEffect, useState } from 'react'
import './AddWorkout.scss'
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { shallowEqual, useSelector } from 'react-redux'
import { WodTypes } from '../../../../Utils/Constants'
import worksService from '../../../../Service/works'

const weightLiftingSessionDefault = [
  { sets: 2, reps: 5, percentage: 50 },
  { sets: 2, reps: 5, percentage: 60 },
  { sets: 2, reps: 4, percentage: 70 },
  { sets: 2, reps: 3, percentage: 75 },
  { sets: 2, reps: 3, percentage: 80 },
  { sets: 2, reps: 2, percentage: 85 }
]

export const AddWorkout = (props) => {
  const { addWorkout, setAddWorkout } = props
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const [loading, setLoading] = useState(false)
  const [weightForm, setWeightForm] = useState(false)
  const { register, errors, handleSubmit, control, watch } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange'
    }
  )
  console.log(addWorkout)
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
      // data.userID = id
      if (addWorkout && !addWorkout.workoutWeek.length) {
        console.log(addWorkout.item.dateDay)
        const data = await worksService.createDay({ date: addWorkout.item.dateDay })
        console.log(data)
      }
      setLoading(false)
      setAddWorkout(prev => ({ ...prev, showModal: false }))
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const calculateWeigth = (item) => {
    const weight = watch('weight')
    if (weight) {
      return item.percentage * weight / 100
    } else {
      return 0
    }
  }

  return (
    <>
      <Modal show={addWorkout.showModal} onHide={() => loading ? setAddWorkout(prev => ({ ...prev, showModal: false })) : null} centered>
        <Modal.Header>
          <Modal.Title>Agregar workout a {addWorkout.item.description} {addWorkout.item.numberDay} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit((e) => { sendData(e) })}>
            <Form.Group controlId='ProductCategory'>
              <Controller
                as={Select}
                options={WodTypes}
                // defaultValue={product.category || null}
                placeholder='Categoría'
                getOptionLabel={option => option.description}
                getOptionValue={option => option.id}
                // value={getValues('categories')}
                onChange={([option]) => option.id}
                name='category'
                rules={{ required: true }}
                control={control}
                className={`select ${(errors.category ? 'active' : 'disable')}`}
              />
              {errors.category?.type === 'required' && <span>Este Campo es Requerido</span>}
            </Form.Group>
            <Form.Control
              ref={register({ required: true })}
              type='number'
              placeholder='Tiempo'
              name='time'
              className={`form-input ${(errors.password ? 'active' : 'disable')}`}
            />
            {weightForm ? (
              <div>
                <Form.Control
                  ref={register({ required: true })}
                  type='text'
                  placeholder='Peso en kilos'
                  name='weight'
                  className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                />
                {weightLiftingSessionDefault.map((item, index) => (
                  <Row key={index}>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        placeholder='Sets'
                        defaultValue={item.sets}
                        name='time'
                        className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        placeholder='Reps'
                        defaultValue={item.reps}
                        name='time'
                        className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        placeholder='%'
                        defaultValue={item.percentage}
                        name='time'
                        className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        placeholder='kilos'
                        defaultValue={calculateWeigth(item)}
                        name='time'
                        className={`form-input ${(errors.password ? 'active' : 'disable')}`}
                      />
                    </Col>
                  </Row>
                ))}
              </div>
            ) : null}
            <Form.Control
              ref={register({ required: true })}
              as='textarea'
              rows={5}
              placeholder='Descripción'
              name='description'
              className={`form-text-area ${(errors.password ? 'active' : 'disable')}`}
            />
            <div className='button-container'>
              <Button variant='outline-secondary' onClick={() => setAddWorkout(prev => ({ ...prev, showModal: false }))} disabled={loading}>
                Cerrar
              </Button>
              <Button variant='primary' type='submit' disabled={loading}>
                {loading ? (
                  <Spinner
                    animation='border' role='status' size='sm' style={{ marginRight: '0.5rem' }}
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
