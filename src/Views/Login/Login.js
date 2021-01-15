import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export const Login = () => {
  const [login, setLogin] = useState(true)
  return (
    <Container>
      {login ? <LoginForm setLogin={() => setLogin(!login)} /> : <SignupForm setLogin={() => setLogin(!login)} />}
    </Container>
  )
}
