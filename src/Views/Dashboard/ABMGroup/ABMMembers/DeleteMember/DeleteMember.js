import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const DeleteMember = (props) => {
  const { deleteMember, setDeleteMember } = props

  return (
    <>
      <Modal show={deleteMember} onHide={() => setDeleteMember(prev => !prev)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Eliminar grupo</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={() => setDeleteMember(prev => !prev)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => setDeleteMember(prev => !prev)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
