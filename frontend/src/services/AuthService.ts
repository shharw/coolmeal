import $api from '../http'
import { type AxiosResponse } from 'axios'

export interface AuthResponse {
  id?: string
  accessToken: string
}

export async function loginReq (login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
  try {
    return await Promise.resolve($api.post<AuthResponse>('/auth/login',
      {
        login,
        password
      }))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function registrationReq (phone: string, login: string, password: string): Promise<AxiosResponse> {
  try {
    return await $api.post('/auth/registration', {
      phone_number: phone,
      login,
      password
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function logoutReq (id: string): Promise<void> {
  try {
    await $api.get(`/auth/logout/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}
