import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import groupsService from '../../../../../Service/groups'

export const DeleteCoach = (props) => {
  const { deleteCoach, setDeleteCoach } = props
  const { member, showModal, selectedGroup } = deleteCoach
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await groupsService.removeCoach({ userID: member.id, groupID: selectedGroup.id })
      setLoading(false)
      setDeleteCoach({ showModal: false, member: null })
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setDeleteCoach({ showModal: false, member: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>{member ? <p>¿Está seguro de eliminar a {member.name}?</p> : null}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteCoach({ showModal: false, member: null })}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleDelete()}>
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
