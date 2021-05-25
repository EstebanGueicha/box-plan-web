import React, { useState } from 'react'
import './NewGroup.scss'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import groupsService from '../../../../Service/groups'
import { shallowEqual, useSelector } from 'react-redux'

export const NewGroup = (props) => {
  const { newGroup, setNewGroup, setFetching } = props
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const [loading, setLoading] = useState(false)
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const sendData = async (data) => {
    try {
      setLoading(true)
      data.userID = id
      await groupsService.createGroup(data)
      setLoading(false)
      setFetching((prev) => !prev)
      setNewGroup((prev) => !prev)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      <Modal
        show={newGroup}
        onHide={() => (loading ? setNewGroup((prev) => !prev) : null)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Nuevo grupo</Modal.Title>
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
              placeholder="Nombre"
              name="name"
              className={`form-input ${errors.password ? 'active' : 'disable'}`}
            />
            <div className="button-container">
              <Button
                variant="outline-secondary"
                onClick={() => setNewGroup((prev) => !prev)}
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
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
