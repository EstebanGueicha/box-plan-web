import axios from 'axios'
import configService from './config'

const api = axios.create({
  baseURL: configService.apiUrl,
})

export default api
