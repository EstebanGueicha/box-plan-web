import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const DeleteMember = (props) => {
  const { deleteMember, setDeleteMember } = props
  const { member, showModal } = deleteMember

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setDeleteMember({ showModal: false, member: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar integrante</Modal.Title>
        </Modal.Header>
        <Modal.Body>{member ? <p>¿Está seguro de eliminar a {member.name}?</p> : null}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteMember({ showModal: false, member: null })}
          >
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => setDeleteMember({ showModal: false, member: null })}
          >
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
