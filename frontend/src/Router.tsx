import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sign from './Sign/Sign'
import AllOrders from './AllOrders/AllOrders'
import MyOrder from './MyOrder/MyOrder'

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={'/sign'} element={<Sign/>}/>
      <Route path={'/orders'} element={<AllOrders/>}/>
      <Route path={'/my-order'} element={<MyOrder/>}/>
    </Routes>
  )
}

export default AppRouter
