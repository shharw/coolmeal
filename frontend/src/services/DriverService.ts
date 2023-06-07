import { type AxiosResponse } from 'axios'
import $api from '../http'
import { type IOrder } from './OrderService'

export type driverStatus = 'free' | 'to_restaurant' | 'to_client'

export interface IDriver {
  id: string
  phone_number: string
  login: string
  password: string
  balance: number
  refreshToken?: string
  status: driverStatus
  orders: IOrder[]
}

export async function getPendingOrdersReq (driverId: string): Promise<AxiosResponse<IOrder[]>> {
  try {
    return await Promise.resolve($api.get<IOrder[]>(`driver/orders/${driverId}`))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getDriverReq (driverId: string): Promise<AxiosResponse<IDriver>> {
  try {
    return await Promise.resolve($api.get<IDriver>(`driver/driver/${driverId}`))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function changeStatusReq (driverId: string, status: driverStatus): Promise<void> {
  try {
    await $api.post('/driver/status-change', {
      id: driverId,
      status
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function completeOrderReq (orderId: string, driverId: string): Promise<void> {
  try {
    await $api.post('/driver/complete', {
      driverId,
      orderId
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getBalanceReq (driverId: string): Promise<AxiosResponse<number>> {
  try {
    return await Promise.resolve($api.get<number>(`/driver/balance/${driverId}`))
  } catch (error) {
    console.log(error)
    throw error
  }
}
