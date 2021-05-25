/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import authService from '../../../Service/auth'
import './SignupForm.scss'

export const SignupForm = (props) => {
  const { setLogin } = props
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  // const dispatch = useDispatch()
  const { register, errors, handleSubmit, watch } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  })
  const watchFields = watch(['password', 'repeatPassword'])

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const sendData = async (data) => {
    const { email, password, firstName, lastName } = data
    setLoading(true)
    try {
      await authService.signup(email, password, firstName, lastName)
      history.push('/dashboard')
      setLoading(false)
    } catch (err) {
      console.log(err)
      alert('Credenciales invalidas')
      setLoading(false)
    }
  }
  return (
    <Container>
      <Form
        onSubmit={handleSubmit((e) => {
          sendData(e)
        })}
      >
        <Form.Group>
          <Form.Control
            ref={register({ required: true, pattern: /^[A-Za-z-ñÑáéíóúÁÉÍÓÚäÄöÖüÜ, ]+$/ })}
            type="text"
            placeholder="Nombre"
            name="firstName"
            className={`form-input ${errors.firstName ? 'active' : 'disable'}`}
          />
          {errors.firstName?.type === 'required' && <span>Este Campo es Requerido</span>}
          {errors.firstName?.type === 'pattern' && <span>El Campo No es Valido</span>}
          <Form.Control
            ref={register({ required: true, pattern: /^[A-Za-z-ñÑáéíóúÁÉÍÓÚäÄöÖüÜ, ]+$/ })}
            type="text"
            placeholder="Apellido"
            name="lastName"
            className={`form-input ${errors.firstName ? 'active' : 'disable'}`}
          />
          {errors.lastName?.type === 'required' && <span>Este Campo es Requerido</span>}
          {errors.lastName?.type === 'pattern' && <span>El Campo No es Valido</span>}
          <Form.Control
            ref={register({
              required: true,
              pattern: /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+.)+([A-Za-z0-9]{2,4}|museum)$/,
            })}
            type="email"
            placeholder="Email"
            name="email"
            className={`form-input ${errors.email ? 'active' : 'disable'}`}
          />
          {errors.email && <span>Este Campo es Requerido</span>}
          <Form.Control
            ref={register({ required: true })}
            type="password"
            placeholder="Contraseña"
            name="password"
            onKeyPress={handleKeyPress}
            className={`form-input ${errors.password ? 'active' : 'disable'}`}
          />
          {errors.password?.type === 'required' && <span>El Campo es Obligatorio</span>}
          <Form.Control
            ref={register({ required: true, validate: (value) => value === watchFields.password })}
            type="password"
            placeholder="Repetir Contraseña"
            name="repeatPassword"
            className={`form-input ${errors.repeatPassword ? 'active' : 'disable'}`}
          />
          {errors.repeatPassword?.type === 'required' && <span>El Campo es Obligatorio</span>}
          {errors.repeatPassword?.type === 'validate' && (
            <span>Las Contraseñas Deben Ser Iguales</span>
          )}
        </Form.Group>
        <Button variant="primary" size="lg" block type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status" size="sm" style={{ marginRight: '0.5rem' }} />
          ) : null}
          Registrarse
        </Button>
      </Form>
      <Button onClick={setLogin}>login</Button>
    </Container>
  )
}
