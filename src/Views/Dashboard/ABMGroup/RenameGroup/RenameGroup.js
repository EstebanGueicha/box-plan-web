import React, { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import groupsService from '../../../../Service/groups'

export const RenameGroup = (props) => {
  const { renameGroup, setRenameGroup, selectedGroup, setFetching } = props
  const [loading, setLoading] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const sendData = async (data) => {
    try {
      setLoading(true)
      data.groupID = selectedGroup.id
      await groupsService.renameGroup(data)
      setLoading(false)
      setFetching((prev) => !prev)
      setRenameGroup((prev) => !prev)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      <Modal
        show={renameGroup}
        onHide={() => (loading ? setRenameGroup((prev) => !prev) : null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Renombrar grupo {selectedGroup.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit((e) => {
              sendData(e)
            })}
          >
            <Form.Control
              ref={register({ required: true })}
              type="text"
              placeholder="Nuevo Nombre"
              name="name"
              defaultValue={selectedGroup.name}
              className={`form-input ${errors.name ? 'active' : 'disable'}`}
            />
            <div className="button-container">
              <Button
                variant="outline-secondary"
                onClick={() => setRenameGroup((prev) => !prev)}
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
                Cambiar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
