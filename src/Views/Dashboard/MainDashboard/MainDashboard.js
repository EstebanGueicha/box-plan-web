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
import { DeleteWorkout } from '../ABMWorkout/DeleteWorks'
import { WeigthCalculate } from '../ABMWorkout/WeigthCalculate'
import { AddTime } from '../ABMWorkout/AddTime'

const drawerWidth = 270

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background: 'rgba(0, 0, 0, 0.9)',
    [theme.breakpoints.up('sm')]: {
      background: 'rgba(0, 0, 0, 0.5)',
    },
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 1),
    },
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
  },
}))

export const MainDashboard = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { type } = useParams()
  const { id } = useSelector((state) => state.user, shallowEqual) || ''
  const [groups, setGroups] = useState([])
  const [fetching, setFetching] = useState(false)
  const [fetchingWorkout, setFetchingWorkout] = useState(false)
  const [showComponent, setShowComponent] = useState('weekGroup')

  const [addWorkout, setAddWorkout] = useState({ showModal: false })
  const [addTime, setAddTime] = useState({ showModal: false })
  const [deleteWorkout, setDeleteWorkout] = useState({ showModal: false })
  const [weigthCalculate, setweigthCalculate] = useState({ showModal: false })

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
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton style={{}} onClick={() => setOpen((prev) => !prev)}>
            {open ? <ChevronLeftIcon color="secondary" /> : <MenuIcon color="secondary" />}
          </IconButton>
        </div>
        <List>
          <ListItem
            className="mainDashboardTitle"
            button
            onClick={() => setShowComponent('weekGroup')}
            title="IR A HOME"
          >
            <ListItemIcon>
              <HomeIcon color="secondary" />
            </ListItemIcon>
            <ListItemText style={{ color: '#F48636' }} primary="IR A HOME" />
          </ListItem>
          <ListItem
            className="mainDashboardTitle"
            button
            onClick={() => setShowComponent('allGroups')}
            title="ADMINISTRAR GRUPOS"
          >
            <ListItemIcon>
              <PeopleOutlineIcon color="secondary" />
            </ListItemIcon>
            <ListItemText style={{ color: '#F48636' }} primary="ADMINISTRAR GRUPOS" />
          </ListItem>
          <ListItem
            className="mainDashboardTitle"
            button
            onClick={() => setShowComponent('profile')}
            title="ADMINISTRAR PERFIL"
          >
            <ListItemIcon>
              <PersonOutlineIcon color="secondary" />
            </ListItemIcon>
            <ListItemText style={{ color: '#F48636' }} primary="ADMINISTRAR PERFIL" />
          </ListItem>
          <ListItem
            className="mainDashboardTitle"
            button
            onClick={() => logout()}
            title="CERRAR SESIÓN"
          >
            <ListItemIcon>
              <ExitToAppIcon color="secondary" />
            </ListItemIcon>
            <ListItemText style={{ color: '#F48636' }} primary="CERRAR SESIÓN" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {showComponent === 'weekGroup' && selectedGroup ? (
          <WeekGroup
            setAddWorkout={setAddWorkout}
            setweigthCalculate={setweigthCalculate}
            setDeleteWorkout={setDeleteWorkout}
            setSelectedGroup={setSelectedGroup}
            fetching={fetching}
            setFetching={setFetching}
            fetchingWorkout={fetchingWorkout}
            setFetchingWorkout={setFetchingWorkout}
            selectedGroup={selectedGroup}
            groups={groups}
            isAdmin={isAdmin}
            setShowComponent={() => setShowComponent('allGroups')}
            setAddTime={setAddTime}
          />
        ) : showComponent === 'allGroups' ? (
          <AllGroups groups={groups} isAdmin={isAdmin} setFetching={setFetching} />
        ) : showComponent === 'profile' ? (
          <Profile />
        ) : (
          <div className="loadingContainer">
            <img
              src="/logo512.png"
              width="500"
              height="auto"
              alt="Logo"
              className="imagenLogoLoading"
            />
          </div>
        )}
        {addTime.showModal ? (
          <AddTime
            addTime={addTime}
            setAddTime={setAddTime}
            setFetching={setFetching}
            setFetchingWorkout={setFetchingWorkout}
          />
        ) : null}
        {addWorkout.showModal ? (
          <AddWorkout
            addWorkout={addWorkout}
            setAddWorkout={setAddWorkout}
            setFetching={setFetching}
            setFetchingWorkout={setFetchingWorkout}
          />
        ) : null}
        {weigthCalculate.showModal ? (
          <WeigthCalculate
            weigthCalculate={weigthCalculate}
            setweigthCalculate={setweigthCalculate}
          />
        ) : null}
        {deleteWorkout.showModal ? (
          <DeleteWorkout
            deleteWorkout={deleteWorkout}
            setDeleteWorkout={setDeleteWorkout}
            setFetching={setFetching}
            setFetchingWorkout={setFetchingWorkout}
          />
        ) : null}
      </main>
    </div>
  )
}
