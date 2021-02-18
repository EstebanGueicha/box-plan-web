import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Navbar } from 'react-bootstrap'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { clearUser } from '../../../Redux/actions'
import authService from '../../../Service/auth'
import groupsService from '../../../Service/groups'
import { AddMember } from '../ABMGroup/ABMMembers/AddMember'
import { DeleteMember } from '../ABMGroup/ABMMembers/DeleteMember'
import { ViewMembers } from '../ABMGroup/ABMMembers/ViewMembers'
import { DeleteGroup } from '../ABMGroup/DeleteGroup'
import { NewGroup } from '../ABMGroup/NewGroup'
import { RenameGroup } from '../ABMGroup/RenameGroup'
import { AddWorkout } from '../ABMWorkout/AddWorkout'
import { WeekGroup } from '../WeekGroup'
import './MainDashboard.scss'

export const MainDashboard = () => {
  const { type } = useParams()
  const { id, name } = useSelector((state) => state.user, shallowEqual) || ''
  const [group, setGroups] = useState([])
  const [fetching, setFetching] = useState(false)

  const [newGroup, setNewGroup] = useState(false)
  const [deleteGroup, setDeleteGroup] = useState(false)
  const [renameGroup, setRenameGroup] = useState(false)

  const [addMember, setAddMember] = useState(false)
  const [deleteMember, setDeleteMember] = useState(false)
  const [viewMembers, setViewMembers] = useState(false)

  const [addWorkout, setAddWorkout] = useState({ showModal: false })

  const [selectedGroup, setSelectedGroup] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const getGroups = async () => {
      try {
        const groups = await groupsService.getGroups({ userID: id, isAdmin: true, isProfileInfo: false })
        if (groups) {
          setGroups(groups.groupsAsAdmin)
          setSelectedGroup(groups.groupsAsAdmin[0])
        }
      } catch (err) {
        console.log(err)
      }
    }
    getGroups()
  }, [id, fetching])

  const dispatch = useDispatch()

  const logout = () => {
    authService.handleLogout()
    dispatch(clearUser())
    history.push('/')
  }

  return (
    <div className='main-dashboard'>
      <Navbar bg='light' fixed='top'>
        <Navbar.Brand>Box Plan {type}</Navbar.Brand>
        <div className='nav-items'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
              Seleccionar Grupo
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {group && group.length && selectedGroup ? group.map((item, index) => (
                <Dropdown.Item key={index} active={item.id === selectedGroup.id} onClick={() => setSelectedGroup(item)}>{item.name}</Dropdown.Item>
              )) : null}

            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={() => setNewGroup(prev => !prev)}>Nuevo grupo +</Button>
        </div>
        <Dropdown drop='left'>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            YO
          </Dropdown.Toggle>

          <Dropdown.Menu>

            <Dropdown.Item>{name}</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      {/* <div className='sidebar'> */}
      {/* </div> */}
      <div className='container-dashboard'>
        <div className='selected-group'>
          {selectedGroup ? <h2>{selectedGroup.name}</h2> : null}
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
              Administrar
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setAddMember(prev => !prev)}>Agregar integrante</Dropdown.Item>
              <Dropdown.Item onClick={() => setViewMembers(prev => !prev)}>Ver integrantes</Dropdown.Item>
              <Dropdown.Item onClick={() => setDeleteMember(prev => !prev)}>Eliminar integrantes</Dropdown.Item>
              <Dropdown.Item onClick={() => setRenameGroup(prev => !prev)}>Cambiar Nombre al grupo</Dropdown.Item>
              <Dropdown.Item onClick={() => setDeleteGroup(prev => !prev)}>Eliminar grupo</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <WeekGroup setAddWorkout={setAddWorkout} />

        {newGroup ? <NewGroup newGroup={newGroup} setNewGroup={setNewGroup} setFetching={setFetching} /> : null}
        {deleteGroup ? <DeleteGroup deleteGroup={deleteGroup} setDeleteGroup={setDeleteGroup} selectedGroup={selectedGroup} setFetching={setFetching} setSelectedGroup={setSelectedGroup} /> : null}
        {renameGroup ? <RenameGroup renameGroup={renameGroup} setRenameGroup={setRenameGroup} selectedGroup={selectedGroup} setFetching={setFetching} /> : null}

        {addMember ? <AddMember addMember={addMember} setAddMember={setAddMember} selectedGroup={selectedGroup} /> : null}
        {deleteMember ? <DeleteMember deleteMember={deleteMember} setDeleteMember={setDeleteMember} selectedGroup={selectedGroup} /> : null}
        {viewMembers ? <ViewMembers viewMembers={viewMembers} setViewMembers={setViewMembers} selectedGroup={selectedGroup} /> : null}
        {addWorkout.showModal ? <AddWorkout addWorkout={addWorkout} setAddWorkout={setAddWorkout} /> : null}
      </div>
    </div>
  )
}
