import React, { useContext, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from './index'

interface Props {
  className: string
  balance?: number
}

const Menu: React.FC<Props> = ({
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleSidebar = async (flag?: boolean): Promise<void> => {
    if (flag === true) await store.getBalance()
    setIsOpen(!isOpen)
  }

  const logout = (): void => {
    const fetchData = async (): Promise<void> => {
      setIsOpen(!isOpen)
      await store.logout(store.driver.id)
      navigate('/')
    }
    void fetchData()
  }

  const redirect = (): void => {
    setIsOpen(!isOpen)
    if (location.pathname === '/my-order') {
      navigate('/orders')
    } else {
      navigate('/my-order')
    }
  }
  return (
    <div className={`relative z-10 font-roboto font-medium ${location.pathname === '/' ? 'hidden' : ''}`}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button className={`${className}`} onClick={async () => { await toggleSidebar(true) }}>
        <BiMenu size={'40px'}/>
      </button>
      <div
        className={`fixed top-0 right-0 w-1/2 h-full bg-white
        transition-transform transform py-5 border-l-2 border-l-yellow
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col justify-center items-center">
            <div className="leading-none text-4xl text-center pb-7
            w-full text-center border-b-2 border-b-yellow">
              <p>Driver</p>
              <p>Menu</p>
            </div>
            <div className={`text-2xl py-3 w-full text-center
            border-b-2 border-b-yellow
            ${location.pathname === '/orders' ? 'bg-yellow pointer-events-none' : ''}`}>
              <button className="" onClick={redirect}>All Orders</button>
            </div>
            <div className={`text-2xl py-3 w-full text-center
              border-b-2 border-b-yellow
              ${location.pathname === '/my-order' ? 'bg-yellow pointer-events-none' : ''}`}>
              <button className="" onClick={redirect}>My Order</button>
            </div>
            <div className={`text-2xl py-3 w-full text-center
              border-b-2 border-b-yellow ${store.isAuth ? '' : 'hidden'}`}>
              <button onClick={logout}>
                Log out
              </button>
            </div>

            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button className="text-xl py-3" onClick={async () => { await toggleSidebar() }}>
              Hide Menu
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="text-3xl">Balance</div>
            <div className="text-2xl">{store.driver.balance} UAH</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
