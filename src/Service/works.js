import api from './api'
const worksService = {}

worksService.createDay = (data) => {
  return api
    .post('/createDay', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.getDaysForWeek = (params) => {
  return api
    .get('/getWeekWorkouts', { params })
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.createWorkout = (data) => {
  return api
    .post('/createWorkout', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.updateWorkout = (data) => {
  return api
    .post('/updateWorkout', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.deleteWorkout = (id) => {
  return api
    .delete(`/deleteWorkout/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.postWeightlifting = (data) => {
  return api
    .post('/createWeightlifting', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

worksService.deleteWeightlifting = (data) => {
  return api
    .delete('/createWeightlifting', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

export default worksService
