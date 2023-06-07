import { type AxiosResponse } from 'axios'
import $api from '../http'
import { type IDriver } from './DriverService'

export type orderStatus = 'active' | 'pending' | 'completed'

export interface IOrder {
  id: string
  restaurant: string
  clientName: string
  clientPhone: string
  clientAddress: string
  restaurantAddress: string
  deliveryPrice: number
  status: orderStatus
  driver?: IDriver
}

export async function fetchActiveOrdersReq (): Promise<AxiosResponse<IOrder[]>> {
  try {
    return await Promise.resolve($api.get<IOrder[]>('/orders/active'))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function acceptOrderReq (orderId: string, driverId: string): Promise<void> {
  try {
    await $api.post('/orders/accept-order', {
      orderId,
      driverId
    }
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}
