import React from 'react'
import { BiUser } from 'react-icons/bi'
import { BsFillArrowRightCircleFill, BsKey } from 'react-icons/bs'

const Login: React.FC = () => {
  return (
    <div>
      <div className="pb-10 relative">
        <input className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
               placeholder={'Username'} type={'text'}/>
        <BiUser className="absolute top-2 left-4" size={'2rem'}/>
      </div>
      <div className="pb-10 relative">
        <input className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
               placeholder={'Password'} type={'password'}/>
        <BsKey className="pointer-events-none absolute top-2 left-4" size={'2rem'}/>
      </div>
      <div>
        <button>
          <BsFillArrowRightCircleFill className="text-5xl"/>
        </button>
      </div>
    </div>
  )
}

export default Login
