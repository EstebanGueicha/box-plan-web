import React, { useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import groupsService from '../../../../Service/groups'

export const DeleteGroup = (props) => {
  const { deleteGroup, setDeleteGroup, selectedGroup, setFetching } = props
  const [loading, setLoading] = useState(false)
  const deleteThisGroup = async () => {
    try {
      setLoading(true)
      await groupsService.deleteGroup({ idgroup: selectedGroup.id })
      setFetching(prev => !prev)
      setLoading(false)
      setDeleteGroup(prev => !prev)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  return (
    <>
      <Modal show={deleteGroup} onHide={() => setDeleteGroup(prev => !prev)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar grupo {selectedGroup.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Esta seguro que desea eliminar este gupo?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={() => setDeleteGroup(prev => !prev)}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => deleteThisGroup()}>
            {loading ? (
              <Spinner
                animation='border' role='status' size='sm' style={{ marginRight: '0.5rem' }}
              />
            ) : null}
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
