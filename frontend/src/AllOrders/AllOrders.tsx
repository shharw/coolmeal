import React from 'react'
import Filter from './Filter'

const AllOrders: React.FC = () => {
  return (
    <div>
      <p className="text-center text-4xl py-2 font-roboto font-bold border-white border-2">All orders</p>
      <div className="bg-white">
        <Filter className="pb-6 pt-4  px-4 border-t-yellow border-t-2"/>
        <div className="px-4 border-t-yellow border-t-2
                      font-roboto py-3 flex flex-col space-y-2">
          <div className="">
            <p className="font-bold text-xl">Order #11111 McDonalds</p>
          </div>
          <div className="">
            <p>Distance to restaurant: 1km</p>
            <p>Distance to client: 5km</p>
          </div>
          <div className="">
            <p>From: Khreschatyk street, 19-a </p>
            <p>To: Bohdan Khmelnitsky street, 40/25</p>
          </div>
          <p>Delivery price: 100 UAH</p>
          <div className="text-end">
            <button className="bg-black rounded-3xl text-white
                                     px-5 py-2 font-bold">Accept
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AllOrders
