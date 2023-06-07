import React, { useContext, useEffect, useState } from 'react'
import { type IOrder } from '../services/OrderService'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt } from 'react-icons/fa'

const MyOrder: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isDriverToClient, setIsDriverToClient] = useState<boolean>(false)
  const { store } = useContext(Context)
  const navigator = useNavigate()

  useEffect(() => {
    const getOrders = async (): Promise<void> => {
      try {
        if (store.driver.id !== undefined) {
          const orders: IOrder[] = await store.getPendingOrders()
          setOrders(orders)
        }
      } catch (error) {
        console.log(error)
      }
    }
    void getOrders()
  }, [])

  const handeAcceptOrder = async (orderId: string): Promise<void> => {
    try {
      if (store.driver.status === 'to_restaurant') {
        await store.changeStatus('to_client')
        setIsDriverToClient(true)
      } else if (store.driver.status === 'to_client') {
        await store.completeOrder(orderId)
        setIsDriverToClient(false)
        navigator('/orders')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p className="text-center text-4xl py-2 font-roboto font-bold border-white border-2">My order</p>
      <div className="bg-white">
        <div className="px-4 font-roboto py-3 flex flex-col space-y-2">
          {orders?.length !== 0
            ? orders?.map((order) => {
              return (
                <div key={order.id} className="border-b-yellow border-b-2 pb-3">
                  <div className="font-bold text-2xl">
                    <p>Restaurant {order.restaurant}</p>
                  </div>
                  <div className="font-bold">
                    <p>Client name: {order.clientName}</p>
                    <p>Client phone: {order.clientPhone}</p>
                  </div>
                  {isDriverToClient
                    ? <p>Goal: {order.clientAddress}</p>
                    : <p>Goal: {order.restaurantAddress}</p>}
                  <div className="text-end">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <button onClick={async () => {
                      await handeAcceptOrder(order.id)
                    }} className="bg-black rounded-3xl text-white px-5 py-2 my-3 font-bold">
                      Arrived
                    </button>
                  </div>
                  {isDriverToClient
                    ? ''
                    : <p><div className='flex flex-row'>
                          <FaMapMarkerAlt/>&nbsp;Next goal: {order.clientAddress}
                      </div> </p> }
                  <div className="text-center text-3xl mt-3">
                    <p>Delivery price:</p>
                    <p>100 UAH</p>
                  </div>
                </div>
              )
            })
            : <p className="text-center font-roboto font-medium text-2xl">Order list<br/>empty</p>}
        </div>
      </div>
    </div>

  )
}

export default MyOrder
