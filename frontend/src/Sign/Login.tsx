import React, { useContext, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { BsFillArrowRightCircleFill, BsKey } from 'react-icons/bs'
import { type IValidation, validateLogin, validatePassword } from '../validation/validationUtils'
import { Context } from '../index'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [clientError, setClientError] = useState<string>('')
  const [errors, setErrors] = useState<IValidation>({
    login: '',
    password: ''
  })
  const { store } = useContext(Context)
  const navigate = useNavigate()

  const handleLogin = async (): Promise<void> => {
    const validations: IValidation = {
      login: validateLogin(login),
      password: validatePassword(password)
    }
    setErrors(validations)
    if (Object.values(validations).every((value) => value === '')) {
      try {
        await store.login(login, password)
        navigate('/orders')
      } catch (error) {
        console.log(error)
        const axiosError = error as AxiosError
        const str = axiosError.response?.data
        setClientError(JSON.parse(JSON.stringify(str)).message)
      }
    } else {
      setClientError('')
    }
  }

  return (
    <div>
      <div className="pb-10 relative">
        <input className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-xl"
               placeholder={'Username'} type={'text'}
               onChange={e => {
                 setLogin(e.target.value)
               }}
               value={login}/>
        <BiUser className="absolute top-2 left-4" size={'2rem'}/>
        {(errors.login !== '') && <p className="font-pt text-red-700 text-xl mt-3 ml-4 text-start">{errors.login}</p>}
      </div>
      <div className="pb-10 relative">
        <input className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
               placeholder={'Password'} type={'password'}
               onChange={e => {
                 setPassword(e.target.value)
               }}
               value={password}/>
        <BsKey className="pointer-events-none absolute top-2 left-4" size={'2rem'}/>
        {(errors.password !== '') &&
          <p className="font-pt text-red-700 text-xl mt-3 ml-4 text-start">{errors.password}</p>}
      </div>
      {(clientError !== '') && <p className="font-pt text-red-700 text-xl -mt-7 ml-4 text-start">{clientError}</p>}
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={handleLogin}>
          <BsFillArrowRightCircleFill className="text-5xl"/>
        </button>
      </div>
    </div>
  )
}

export default Login
