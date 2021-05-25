import api from './api'
const userService = {}

userService.loginWithSocialCredentials = (data) => {
  return api
    .post('registerUserWithSocialCredentials/Bpuser', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

export default userService
