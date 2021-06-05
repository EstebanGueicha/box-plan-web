import api from './api'
const groupsService = {}

groupsService.getGroups = (params) => {
  return api
    .get('/getUserGroups', { params })
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.createGroup = (data) => {
  return api
    .post('/createGroup/BpGroup', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.addMembers = (data) => {
  return api
    .post('/addMembers', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.removeMember = (data) => {
  return api
    .post('/removeMember', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.addCoach = (data) => {
  return api
    .post('/addCoaches', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.removeCoach = (data) => {
  return api
    .post('/removeCoach', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.getGroupMembers = (params) => {
  return api
    .get('/getGroupMembers', { params })
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.renameGroup = (data) => {
  return api
    .post('/renameGroup', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.deleteGroup = (id) => {
  return api
    .delete(`/deleteGroup/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

groupsService.searchMembers = (params) => {
  return api
    .get('/searchNewMembersbyKey', { params })
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}
export default groupsService
