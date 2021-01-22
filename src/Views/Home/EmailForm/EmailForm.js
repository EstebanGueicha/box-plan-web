import React from 'react'
import { TextField } from '@material-ui/core'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import './EmailForm.scss'

export const EmailForm = () => {
  const { register, errors, handleSubmit } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange'
    }
  )
  const sendData = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <form onSubmit={handleSubmit((e) => { sendData(e) })}>
        <Row>
          <Col lg={6}>
            <TextField
              id='standard-basic'
              label='Email'
              ref={register({ required: true, pattern: /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+.)+([A-Za-z0-9]{2,4}|museum)$/ })}
              type='email'
              name='email'
              fullWidth
              className={`form-input ${(errors.email ? 'active' : 'disable')}`}
            />
            {errors.email && <span>Este Campo es Requerido</span>}
          </Col>
          <Col lg={6}>
            <TextField
              id='standard-basic'
              label='Nombre'
              ref={register({ required: true })}
              type='text'
              name='name'
              fullWidth
              className={`form-input ${(errors.name ? 'active' : 'disable')}`}
            />
            {errors.name && <span>Este Campo es Requerido</span>}
          </Col>
          <Col lg={12}>
            <TextField
              id='standard-basic'
              label='Comentario'
              ref={register({ required: true })}
              type='text'
              name='message'
              fullWidth
              className={`form-input ${(errors.message ? 'active' : 'disable')}`}
            />
            {errors.message && <span>Este Campo es Requerido</span>}
          </Col>
          <Button type='submit'>Enviar mensaje</Button>
        </Row>
      </form>
    </Container>
  )
}
