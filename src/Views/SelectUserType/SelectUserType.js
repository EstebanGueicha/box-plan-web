import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import authService from '../../Service/auth'
import './SelectUserType.scss'

export const SelectUserType = () => {
  const history = useHistory()
  const logout = () => {
    authService.handleLogout()
    history.push('/')
  }
  return (
    <Button onClick={logout}>logout</Button>
  )
}
