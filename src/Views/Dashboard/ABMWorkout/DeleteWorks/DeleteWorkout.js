import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import worksService from '../../../../Service/works'
import { WodTypes } from '../../../../Utils/Constants'

export const DeleteWorkout = (props) => {
  const { deleteWorkout, setDeleteWorkout, setFetching, setFetchingWorkout } = props
  const { showModal, workout } = deleteWorkout
  const [loading, setLoading] = useState(false)

  const deleteThisWorkout = async () => {
    try {
      setLoading(true)
      await worksService.deleteWorkout(workout._id)
      setFetching((prev) => !prev)
      setFetchingWorkout((prev) => !prev)
      setLoading(false)
      setDeleteWorkout((prev) => ({ ...prev, showModal: false }))
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setDeleteWorkout((prev) => ({ ...prev, showModal: false }))}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Eliminar Workout{' '}
            {workout.title
              ? workout.title
              : WodTypes.find((w) => w.id === workout.wodType).description}
            {workout.workoutTime}'
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Esta seguro que desea eliminar este workout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteWorkout((prev) => ({ ...prev, showModal: false }))}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => deleteThisWorkout()}>
            {loading ? (
              <Spinner
                animation="border"
                role="status"
                size="sm"
                style={{ marginRight: '0.5rem' }}
              />
            ) : null}
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
