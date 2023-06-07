import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

interface Props {
  name?: string
}

const Sign: React.FC<Props> = () => {
  const [activeForm, setActiveForm] = useState<'signin' | 'signup'>('signin')
  const handleLoginClick = (): void => { setActiveForm('signin') }
  const handleRegisterClick = (): void => { setActiveForm('signup') }

  return (
    <div>
      <div className="text-4xl mt-16 text-start font-pt">
        <div className="font-bold">Welcome, Driver!</div>
        <div className="">Sign in to Continue</div>
      </div>
      <div className="bg-white mt-8">
        <div className="grid grid-flow-row auto-row-max">
          <div
            className="grid grid-flow-col
            font-pt font-bold text-lg text-center
            items-center border-b-2 border-b-yellow
            ">
            <div className={`p-5 ${activeForm === 'signin' ? 'bg-yellow border-2 border-white border-b-yellow' : ''}`}>
              <button onClick={handleLoginClick} className="w-full h-full">
                Sign In
              </button>
            </div>
            <div className={`p-5 ${activeForm === 'signup' ? 'bg-yellow border-2 border-white border-b-yellow' : ''}`}>
              <button onClick={handleRegisterClick} className="w-full h-full">
                Sign Up
              </button>
            </div>
          </div>
          <div className="text-center py-14 px-5">
            { activeForm === 'signin' ? <Login/> : <Register/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sign
