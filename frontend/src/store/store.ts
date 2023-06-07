import {
  changeStatusReq, completeOrderReq, type driverStatus,
  getBalanceReq,
  getDriverReq,
  getPendingOrdersReq,
  type IDriver
} from '../services/DriverService'
import { makeAutoObservable } from 'mobx'
import { type AuthResponse, loginReq, logoutReq, registrationReq } from '../services/AuthService'
import { acceptOrderReq, fetchActiveOrdersReq, type IOrder } from '../services/OrderService'
import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '../http'

export default class Store {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  driver = {} as IDriver
  isAuth = false
  isLoading = false

  constructor () {
    makeAutoObservable(this)
  }

  setAuth (auth: boolean): void {
    this.isAuth = auth
  }

  setLoading (loading: boolean): void {
    this.isLoading = loading
  }

  setDriver (driver: IDriver): void {
    this.driver = driver
  }

  setDriverBalance (bal: number): void {
    this.driver.balance = bal
  }

  async login (login: string, password: string): Promise<void> {
    try {
      const response = await loginReq(login, password)
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      await this.getDriver(response.data.id ?? '')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getDriver (id: string): Promise<void> {
    const response = await getDriverReq(id)
    const driver: IDriver = response.data
    this.setDriver(driver)
  }

  async registration (phone: string, login: string, password: string): Promise<void> {
    try {
      await registrationReq(phone, login, password)
      this.setAuth(false)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async logout (id: string): Promise<void> {
    try {
      await logoutReq(id)
      localStorage.removeItem('accessToken')
      this.setAuth(false)
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.setDriver({ } as IDriver)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async checkAuth (): Promise<void> {
    try {
      this.setLoading(true)
      const response = await axios.patch<AuthResponse>(`${API_URL}/auth/refresh`, { accessToken: localStorage.getItem('accessToken') }, { withCredentials: true })
      localStorage.setItem('accessToken', response.data.accessToken)
      this.setAuth(true)
      await this.getDriver(response.data.id ?? '')
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      this.setLoading(false)
    }
  }

  async fetchActiveOrders (): Promise<IOrder[]> {
    const response: AxiosResponse = await fetchActiveOrdersReq()
    const orders: IOrder[] = response.data
    return orders
  }

  async acceptOrder (orderId: string): Promise<void> {
    try {
      await acceptOrderReq(orderId, this.driver.id)
      await this.getDriver(this.driver.id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getPendingOrders (): Promise<IOrder[]> {
    try {
      const response: AxiosResponse = await getPendingOrdersReq(this.driver.id)
      const orders: IOrder[] = response.data
      return orders
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getBalance (): Promise<void> {
    try {
      const response: AxiosResponse = await getBalanceReq(this.driver.id)
      const balance: number = response.data
      this.setDriverBalance(balance)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async changeStatus (status: driverStatus): Promise<void> {
    try {
      await changeStatusReq(this.driver.id, status)
      await this.getDriver(this.driver.id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async completeOrder (orderId: string): Promise<void> {
    try {
      await completeOrderReq(orderId, this.driver.id)
      await this.getBalance()
      this.driver.orders = []
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
