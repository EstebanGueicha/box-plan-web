import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import { WeekGroup } from '../WeekGroup'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { clearUser } from '../../../Redux/actions'
import authService from '../../../Service/auth'
import groupsService from '../../../Service/groups'
import { AddWorkout } from '../ABMWorkout/AddWorkout'
import './MainDashboard.scss'
import { AllGroups } from '../AllGroups'
import { Profile } from '../Profile'

const drawerWidth = 260

const useStyles = makeStyles((theme) => ({
  root: {

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7)
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3)
  }
}))

export const MainDashboard = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { type } = useParams()
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const [groups, setGroups] = useState([])
  const [fetching, setFetching] = useState(false)
  const [showComponent, setShowComponent] = useState('weekGroup')

  const [addWorkout, setAddWorkout] = useState({ showModal: false })

  const [selectedGroup, setSelectedGroup] = useState(null)

  const history = useHistory()
  const isAdmin = type === 'coach'

  useEffect(() => {
    const getGroups = async () => {
      try {
        const groups = await groupsService.getGroups({ userID: id, isAdmin, isProfileInfo: false })
        if (groups) {
          setGroups(isAdmin ? groups.groupsAsAdmin : groups.groupsAsMember)
          setSelectedGroup(isAdmin ? groups.groupsAsAdmin[0] : groups.groupsAsMember[0])
        }
        if (groups && isAdmin && groups.groupsAsAdmin && !groups.groupsAsAdmin.length) {
          setShowComponent('allGroups')
        }
      } catch (err) {
        console.log(err)
      }
    }
    getGroups()
  }, [id, fetching, type, isAdmin])

  const dispatch = useDispatch()

  const logout = () => {
    authService.handleLogout()
    dispatch(clearUser())
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton style={{}} onClick={() => setOpen(prev => !prev)}>
            {open ? <ChevronLeftIcon style={{ color: 'orange' }} /> : <MenuIcon style={{ color: 'orange' }} />}
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={() => setShowComponent('weekGroup')} title='IR A HOME'>
            <ListItemIcon><HomeIcon style={{ color: 'orange' }} /></ListItemIcon>
            <ListItemText style={{ color: 'orange' }} primary='IR A HOME' />
          </ListItem>
          <ListItem button onClick={() => setShowComponent('allGroups')} title='ADMINISTRAR GRUPOS'>
            <ListItemIcon><PeopleOutlineIcon style={{ color: 'orange' }} /></ListItemIcon>
            <ListItemText style={{ color: 'orange' }} primary='ADMINISTRAR GRUPOS' />
          </ListItem>
          <ListItem button onClick={() => setShowComponent('profile')} title='ADMINISTRAR PERFIL'>
            <ListItemIcon><PersonOutlineIcon style={{ color: 'orange' }} /></ListItemIcon>
            <ListItemText style={{ color: 'orange' }} primary='ADMINISTRAR PERFIL' />
          </ListItem>
          <ListItem button onClick={() => logout()} title='CERRAR SESIÓN'>
            <ListItemIcon><ExitToAppIcon style={{ color: 'orange' }} /></ListItemIcon>
            <ListItemText style={{ color: 'orange' }} primary='CERRAR SESIÓN' />
          </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>

        {showComponent === 'weekGroup' && selectedGroup
          ? (
            <WeekGroup
              setAddWorkout={setAddWorkout}
              setSelectedGroup={setSelectedGroup}
              fetching={fetching}
              setFetching={setFetching}
              selectedGroup={selectedGroup}
              groups={groups}
              isAdmin={isAdmin}
              setShowComponent={() => setShowComponent('allGroups')}
            />
          ) : (
            showComponent === 'allGroups'
              ? (
                <AllGroups groups={groups} isAdmin={isAdmin} setFetching={setFetching} />
              ) : (
                showComponent === 'profile' ? (
                  <Profile />
                ) : null
              ))}
        {addWorkout.showModal ? <AddWorkout addWorkout={addWorkout} setAddWorkout={setAddWorkout} setFetching={setFetching} /> : null}
      </main>
    </div>
  )
}
