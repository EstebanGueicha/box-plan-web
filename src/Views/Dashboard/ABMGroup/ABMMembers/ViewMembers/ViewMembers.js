import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import groupsService from '../../../../../Service/groups'

export const ViewMembers = (props) => {
  const { viewMembers, setViewMembers, selectedGroup } = props
  const [members, setMembers] = useState([])

  useEffect(() => {
    const getGroupMembers = async (groupId) => {
      try {
        const members = await groupsService.getGroupMembers({ groupID: groupId })
        setMembers(members)
      } catch (err) {
        console.log(err)
      }
    }
    if (selectedGroup && viewMembers) {
      getGroupMembers(selectedGroup.id)
    }
  }, [selectedGroup, viewMembers])

  return (
    <>
      <Modal show={viewMembers} onHide={() => setViewMembers((prev) => !prev)} centered>
        <Modal.Header closeButton>
          <Modal.Title>integrantes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {members.length ? (
            members.map((item, index) => <p key={index}>{item.name}</p>)
          ) : (
            <p>No hay integrantes</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setViewMembers((prev) => !prev)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => setViewMembers((prev) => !prev)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
