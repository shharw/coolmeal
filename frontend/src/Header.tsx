import React from 'react'
import Menu from './Menu'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const redirect = (): void => {
    navigate('/orders')
  }

  return (
        <div className='flex items-center justify-between'>
            <div onClick={redirect} className="flex items-center">
              {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
              <img className='w-24' src={`${process.env.PUBLIC_URL}/logo512.png`} alt='logo'/>
              <span className='text-[42px] font-slab'>Coolmeal</span>
            </div>
          <Menu className='pr-6 pt-3'/>
        </div >

  )
}

export default Header
