import React, { useState } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import authService from '../../Service/auth'
import userService from '../../Service/user'
import { setUserData } from '../../Redux/actions'
import './Login.scss'
export const Login = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
      defaultValues: {
        password: ''
      }
    }
  )

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const loginWithSocial = async (flag) => {
    setLoading(true)
    try {
      const { user, credential } = flag === 'google' ? await authService.handleAuthGoogle() : await authService.handleAuthFacebook()
      const { displayName, email } = user
      const { accessToken } = credential
      authService.setToken(accessToken)
      const userData = await userService.loginWithSocialCredentials({ name: displayName, lastName: 'lastName', mail: email })
      dispatch(setUserData(userData))
      setLoading(false)
      history.push('/dashboard')
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const sendData = async (data) => {
    setLoading(true)
    try {
      const log = await authService.handleLogin(data.email, data.password)
      console.log(log)
      setLoading(false)
    } catch (err) {
      console.log(err)
      alert('Credenciales invalidas')
      setLoading(false)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit((e) => { sendData(e) })}>
        <Form.Group>
          <Form.Control
            ref={register({ required: true, pattern: /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+.)+([A-Za-z0-9]{2,4}|museum)$/ })}
            type='email' placeholder='Email'
            name='email'
            className={`form-input ${(errors.email ? 'active' : 'disable')}`}
          />
          {errors.email && <span>Este Campo es Requerido</span>}
          <Form.Control
            ref={register({ required: true })}
            type='password'
            placeholder='Contraseña'
            name='password'
            onKeyPress={handleKeyPress}
            className={`form-input ${(errors.password ? 'active' : 'disable')}`}
          />
          {errors.password?.type === 'required' && <span>El Campo es Obligatorio</span>}
        </Form.Group>
        <Button variant='primary' size='lg' block type='submit' disabled={loading}>
          {loading ? (
            <Spinner
              animation='border' role='status' size='sm' style={{ marginRight: '0.5rem' }}
            />
          ) : null}
          Ingresar
        </Button>
      </Form>
      <Button onClick={() => loginWithSocial('google')}>Google</Button>
      <Button onClick={() => loginWithSocial('facebook')}>Facebook</Button>
    </Container>
  )
}
