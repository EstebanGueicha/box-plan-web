import React, { useState } from 'react'
import './Login.scss'
import { Button, Container } from 'react-bootstrap'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { useHistory } from 'react-router-dom'

export const Login = () => {
  const [login, setLogin] = useState(true)
  const history = useHistory()
  return (
    <div className="primary-container">
      <Container>
        <Button variant="link" onClick={() => history.push('/')}>
          BoxPlan
        </Button>
        <div className="login-container">
          {login ? (
            <LoginForm setLogin={() => setLogin(!login)} />
          ) : (
            <SignupForm setLogin={() => setLogin(!login)} />
          )}
        </div>
      </Container>
    </div>
  )
}
