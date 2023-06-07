import React, { useContext, useState } from 'react'
import { BiLogInCircle, BiUser } from 'react-icons/bi'
import { BsFillArrowRightCircleFill, BsKey } from 'react-icons/bs'
import { type IValidation, validateLogin, validatePhone, validatePassword } from '../validation/validationUtils'
import { Context } from '../index'
import { type AxiosError } from 'axios'

const Register: React.FC = () => {
  const [phone, setPhone] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [clientError, setClientError] = useState<string>('')
  const [errors, setErrors] = useState<IValidation>({
    phone: '',
    login: '',
    password: ''
  })
  const { store } = useContext(Context)

  const handleRegister = async (): Promise<void> => {
    const validations: IValidation = {
      phone: validatePhone(phone),
      login: validateLogin(login),
      password: validatePassword(password)
    }
    setErrors(validations)
    if (Object.values(validations).every((value) => value === '')) {
      try {
        await store.registration(phone, login, password)
        setSuccessMsg('Нou have successfully registered, please sign in')
        setPhone('')
        setLogin('')
        setPassword('')
      } catch (error) {
        const axiosError = error as AxiosError
        const str = axiosError.response?.data
        setClientError(JSON.parse(JSON.stringify(str)).message)
      }
    } else {
      setClientError('')
      setSuccessMsg('')
    }
  }

  return (
    <div>
      <div className="pb-10 relative">
        <input
          className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
          placeholder={'Phone number'}
          type={'text'}
          onChange={(e) => {
            setPhone(e.target.value)
          }}
          value={phone}
        />
        <BiUser className="absolute top-2 left-4" size={'2rem'}/>
        {(errors.phone !== '') && <p className="font-pt text-red-700 text-xl mt-3 ml-4 text-start">{errors.phone}</p>}
      </div>
      <div className="pb-10 relative">
        <input
          className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
          placeholder={'Login'}
          type={'text'}
          onChange={(e) => {
            setLogin(e.target.value)
          }}
          value={login}
        />
        <BiLogInCircle className="absolute top-2 left-4" size={'2rem'}/>
        {(errors.login !== '') && <p className="font-pt text-red-700 text-xl mt-3 ml-4 text-start">{errors.login}</p>}
      </div>
      <div className="pb-10 relative">
        <input
          className="pl-14 rounded-3xl border-black border-2 w-full h-12 font-pt text-lg"
          placeholder={'Password'}
          type={'password'}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
        />
        <BsKey className="pointer-events-none absolute top-2 left-4" size={'2rem'}/>
        {(errors.password !== '') &&
          <p className="font-pt text-red-700 text-xl mt-3 ml-4 text-start">{errors.password}</p>}
      </div>
      {(clientError !== '') &&
        <p className="font-pt text-red-700 text-xl -mt-7 ml-4 text-start">{clientError}</p>}
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <button onClick={handleRegister}>
          <BsFillArrowRightCircleFill className="text-5xl"/>
        </button>
      </div>
      {(successMsg !== '') &&
        <p className="font-pt text-yellow text-2xl mt-3 text-center">{successMsg}</p>}
    </div>
  )
}

export default Register
