import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearUser } from '../../../Redux/actions'
import authService from '../../../Service/auth'
import './SelectUserType.scss'

export const SelectUserType = ({ routes }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    authService.handleLogout()
    dispatch(clearUser())
    history.push('/')
  }
  return (
    <>
      <Button onClick={logout}>logout</Button>
      <Button onClick={() => history.push('/dashboard/coach')}>Coach</Button>
      <Button onClick={() => history.push('/dashboard/athlete')}>atleta</Button>
    </>
  )
}
