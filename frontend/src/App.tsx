import React, { useContext, useEffect } from 'react'
import './input.css'
import Header from './Header'
import Router from './Router'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { Context } from './index'

const App: React.FC = () => {
  const navigate = useNavigate()
  const { store } = useContext(Context)

  useEffect(() => {
    void store.fetchActiveOrders()
    const fetchData = async (): Promise<void> => {
      if (localStorage.getItem('accessToken') != null) {
        await store.checkAuth()
      }
      if (store.isAuth) {
        navigate('/orders')
      } else {
        navigate('/')
      }
    }
    void fetchData()
  }, [])

  if (store.isLoading) {
    return (
      <div className='bg-yellow min-h-screen'>
        <Header/>
        <div className='text-center text-3xl font-roboto mt-3'>Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-yellow min-h-screen">
      <Header/>
      <div className="px-6">
        <Router/>
      </div>
    </div>
  )
}

export default observer(App)
