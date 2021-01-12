import api from './api'
const userService = {}

userService.loginWithSocialCredentials = (payload) => {
  return api.post('registerUserWithSocialCredentials/Bpuser', payload)
    .then(res => res.data)
    .catch(err => { throw err })
}

export default userService
