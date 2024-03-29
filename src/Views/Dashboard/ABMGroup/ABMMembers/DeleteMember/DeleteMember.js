import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import groupsService from '../../../../../Service/groups'

export const DeleteMember = (props) => {
  const { deleteMember, setDeleteMember, setFetchingMembers } = props
  const { member, showModal, selectedGroup } = deleteMember
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await groupsService.removeMember({ userID: member.id, groupID: selectedGroup.id })
      setLoading(false)
      setDeleteMember({ showModal: false, member: null })
      setFetchingMembers((prev) => !prev)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

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
