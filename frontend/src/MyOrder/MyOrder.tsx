import React from 'react'

const MyOrder: React.FC = () => {
  return (
    <div>
      <p className="text-center text-4xl py-2 font-roboto font-bold border-white border-2">My order</p>
      <div className="bg-white">
        <div className="px-4 border-t-yellow border-t-2
                      font-roboto py-3 flex flex-col space-y-2">
          <div className="font-bold text-2xl">
            <p>Order #11111 McDonalds</p>
          </div>
          <div className="font-bold">
            <p>Client name: Name Name</p>
            <p>Client phone: +380487340561</p>
          </div>
          <p>Goal: Khreschatyk street, 19-a</p>
          <div className="text-end">
            <button className="bg-black rounded-3xl text-white
                                     px-5 py-2 font-bold">
              Accept
            </button>
          </div>

          <p>Next goal: Bohdan Khmelnitsky street, 40/25</p>
          <div className="text-center text-4xl">
            <p>Delivery price:</p>
            <p>100 UAH</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MyOrder
