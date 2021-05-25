/* eslint-disable no-undef */
import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import './EmailForm.scss'
import emailService from '../../../Service/email'

export const EmailForm = (props) => {
  const { setShow } = props
  const [loading, setLoading] = useState(false)
  const { errors, handleSubmit, control } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })
  const sendData = async (data) => {
    setLoading(true)
    try {
      await emailService.sendMailComments(data)
      setShow(true)
      setLoading(false)
    } catch (error) {
      console.log(error)
      alert('Tu mensaje no ha podido enviarse.')
      setLoading(false)
    }
  }
  return (
    <Container className="email-form-container">
      <form
        onSubmit={handleSubmit((e) => {
          sendData(e)
        })}
      >
        <Row className="justify-content-center">
          <Col lg={6}>
            <Controller
              name="email"
              as={
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  className={`form-input ${errors.email ? 'active' : 'disable'}`}
                />
              }
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+.)+([A-Za-z0-9]{2,4}|museum)$/,
              }}
            />
            {errors.email && <span>Este Campo es Requerido</span>}
          </Col>
          <Col lg={6}>
            <Controller
              name="name"
              as={
                <TextField
                  id="name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  className={`form-input ${errors.name ? 'active' : 'disable'}`}
                />
              }
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.name && <span>Este Campo es Requerido</span>}
          </Col>
          <Col lg={12}>
            <Controller
              name="message"
              as={
                <TextField
                  id="message"
                  label="Comentario"
                  multiline
                  rows={5}
                  type="text"
                  fullWidth
                  className={`form-input ${errors.message ? 'active' : 'disable'}`}
                />
              }
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.message && <span>Este campo es requerido</span>}
          </Col>
          <Button type="submit" className="email-form-button" disabled={loading}>
            Enviar mensaje
            {loading === true ? <Spinner animation="border" role="status" /> : null}
          </Button>
        </Row>
      </form>
    </Container>
  )
}
