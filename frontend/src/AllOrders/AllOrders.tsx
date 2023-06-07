import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { type IOrder } from '../services/OrderService'
import { useNavigate } from 'react-router-dom'

const AllOrders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([])
  const { store } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    const getOrders = async (): Promise<void> => {
      try {
        const orders: IOrder[] = await store.fetchActiveOrders()
        setOrders(orders)
      } catch (error) {
        console.log(error)
      }
    }
    void getOrders()
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const intervalId = setInterval(getOrders, 2000)

    return () => { clearInterval(intervalId) }
  }, [])

  const handeAcceptOrder = async (orderId: string): Promise<void> => {
    try {
      if (store.driver.orders.length < 1) {
        await store.acceptOrder(orderId)
        navigate('/my-order')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <p className="text-center text-4xl py-2 font-roboto font-bold border-white border-2">All orders</p>
      <div className="bg-white">
        <div className="px-4 font-roboto py-3 flex flex-col space-y-2">
          {orders?.length !== 0
            ? orders?.map((order) => {
              return (
                <div key={order.id} className="border-b-yellow border-b-2 pb-3">
                  <div className="">
                    <p className="font-bold text-xl">Restaurant {order.restaurant} </p>
                  </div>
                  <div className="">
                    <p>From: {order.restaurantAddress} </p>
                    <p>To: {order.clientAddress}</p>
                  </div>
                  <p>Delivery price: {order.deliveryPrice} UAH</p>
                  <div className="text-end">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <button onClick={async () => {
                      await handeAcceptOrder(order.id)
                    }}
                            className="bg-black rounded-3xl text-white px-5 py-2 font-bold">Accept
                    </button>
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

export default AllOrders
