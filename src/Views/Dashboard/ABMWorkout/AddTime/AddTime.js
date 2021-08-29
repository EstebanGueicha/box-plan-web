import React, { useState } from 'react'
import './AddWorkout.scss'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { shallowEqual, useSelector } from 'react-redux'
import worksService from '../../../../Service/works'

export const AddTime = (props) => {
  const { addTime, setAddTime, setFetchingWorkout } = props
  const [loading, setLoading] = useState(false)
  const { id } = useSelector((state) => state.user, shallowEqual) || ''

  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const sendData = async (data) => {
    try {
      setLoading(true)
      data.workoutID = addTime.workout._id
      data.userID = id
      if (addTime.update) {
        await worksService.updateWorkout(data)
      } else {
        await worksService.createUserTime(data)
      }
      setLoading(false)
      setFetchingWorkout((prev) => !prev)
      setAddTime((prev) => ({ ...prev, showModal: false }))
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      <Modal
        show={addTime.showModal}
        onHide={() => (loading ? setAddTime((prev) => ({ ...prev, showModal: false })) : null)}
        centered
      >
        <Modal.Header>
          <Modal.Title>{addTime.update ? 'Actualizar' : 'Agregar'} mi tiempo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((e) => {
              sendData(e)
            })}
          >
            <Form.Control
              ref={register({ required: true })}
              type="number"
              placeholder="Tiempo"
              name="time"
              className={`form-input ${errors.workoutTime ? 'active' : 'disable'}`}
            />

            <Form.Control
              ref={register({ required: true })}
              as="textarea"
              rows={5}
              placeholder="Descripción"
              name="description"
              className={`form-text-area ${errors.workoutDescription ? 'active' : 'disable'}`}
            />
            <div className="button-container">
              <Button
                variant="outline-secondary"
                onClick={() => setAddTime((prev) => ({ ...prev, showModal: false }))}
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
                {addTime.update ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
