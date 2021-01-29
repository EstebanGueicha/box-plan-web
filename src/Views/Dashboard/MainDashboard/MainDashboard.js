import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { clearUser } from '../../../Redux/actions'
import authService from '../../../Service/auth'
import groupsService from '../../../Service/groups'
import './MainDashboard.scss'

export const MainDashboard = () => {
  const { type } = useParams()
  const { id, name } = useSelector((state) => state.user, shallowEqual) || ''
  const [group, setGroups] = useState([])
  const [members, setMembers] = useState([])
  const history = useHistory()

  useEffect(() => {
    const getGroups = async () => {
      try {
        const groups = await groupsService.getGroups({ userID: id, isAdmin: true, isProfileInfo: false })
        if (groups) setGroups(groups.groupsAsAdmin)
      } catch (err) {
        console.log(err)
      }
    }
    getGroups()
  }, [id])

  useEffect(() => {
    const getGroupMembers = async (groupId) => {
      try {
        const members = await groupsService.getGroupMembers({ groupID: groupId })
        setMembers(members)
      } catch (err) {
        console.log(err)
      }
    }
    if (group.length) {
      getGroupMembers(group[0].id)
    }
  }, [group])

  const dispatch = useDispatch()

  const logout = () => {
    authService.handleLogout()
    dispatch(clearUser())
    history.push('/')
  }

  return (
    <div className='main-dashboard'>
      <div className='header' />
      <input type='checkbox' className='openSidebarMenu' id='openSidebarMenu' />
      <label htmlFor='openSidebarMenu' className='sidebarIconToggle'>
        <div className='spinner diagonal part-1' />
        <div className='spinner horizontal' />
        <div className='spinner diagonal part-2' />
      </label>
      <div id='sidebarMenu'>
        <ul className='sidebarMenuInner'>
          <li>Jelena Jovanovic <span>Web Developer</span></li>
          <li> <Button onClick={logout}>logout</Button></li>
        </ul>
      </div>
      <div id='center' className='main center'>
        <div className='mainInner'>
          <div><p>{type}</p>
            <p>{name}</p>
            <p>Grupos</p>
            {group.length ? group.map((item, index) =>
              <p key={index}>{item.name}</p>
            ) : <p>No tiene grupos</p>}
            <p>Miembros</p>
            {members.length ? members.map((item, index) =>
              <p key={index}>Nombre: {item.name} correo: {item.mail} </p>
            ) : <p>No posee miembros</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
