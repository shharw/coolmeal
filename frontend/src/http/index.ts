import axios from 'axios'
import { type AuthResponse } from '../services/AuthService'

export const API_URL = 'http://localhost:5000'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')
  config.headers.Authorization = `Bearer ${accessToken ?? ''}`
  return config
})

$api.interceptors.response.use(config => {
  return config
}, async (error) => {
  const originRequest = error.config
  if (error.response.status === 401 && error.config !== null && error.config._isRetry !== true) {
    originRequest._isRetry = true
    try {
      const response = await axios.patch<AuthResponse>(`${API_URL}/auth/refresh`, { accessToken: localStorage.getItem('accessToken') }, { withCredentials: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      return await $api.request(originRequest)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  throw error
})

export default $api
