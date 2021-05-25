import api from './api'
const emailService = {}

emailService.sendMailComments = (data) => {
  return api
    .post('/sendMail', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

export default emailService
