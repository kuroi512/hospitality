'use client'

import axios from 'axios'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useUserContext } from '@/context/user'
import { useRouter } from 'next/navigation'
import { setToken } from '@/utils/token'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { App } from 'antd'

export default function SignIn() {
  const { message } = App.useApp()
  const { login } = useUserContext()
  const router = useRouter()
  const [signIn, setSignIn] = useState({
    email: '',
    password: ''
  })
  const [validations, setValidations] = useState({
    email: false,
    password: false
  })

  const validate = () => {
    let isValid = true
    setValidations({
      email: false,
      password: false
    })

    if (!signIn.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
      setValidations((prev) => ({
        ...prev,
        email: true
      }))
      isValid = false
    }
    if (!signIn.password || signIn.password.length < 6) {
      setValidations((prev) => ({
        ...prev,
        password: true
      }))
      isValid = false
    }

    return isValid
  }

  const handleChange = (event: any) => {
    setSignIn({ ...signIn, [event.target.name]: event.target.value })
  }

  const submit = async () => {
    if (validate()) {
      try {
        await axios
          .post(`${process.env.GUEST_API_URL}/auth/login`, signIn, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(({ status, data }) => {
            if (status === 200) {
              setToken(data.token)
              login(data.data)
              message.success('Амжилттай нэвтэрлээ')
              router.push('/')
            }
          })
          .catch(({ response: { status, data } }) => {
            if (status === 401) {
              message.warning('Имэйл эсвэл нууц үг буруу байна')
            } else if (status === 422) {
              message.error('Имэйл эсвэл нууц үг буруу байна')
            }
          })
      } catch (error) {}
    }
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-content text-white'>
      <div className='absolute left-0 top-0 z-10 h-full w-full bg-lines'></div>
      <p className='text z-20 my-4 text-4xl font-bold'>Сайтад нэвтрэх</p>
      <div className='z-20 mt-2 flex w-96 flex-col items-center justify-center gap-y-2 text-center'>
        <Input
          label='И-мэйл'
          type='email'
          name='email'
          isInvalid={validations.email}
          errorMessage={validations.email && 'И-мэйл бичнэ үү'}
          className='text-start'
          autoComplete='off'
          variant='bordered'
          radius='none'
          value={signIn.email}
          onChange={handleChange}
        />
        <Input
          label='Нууц үг'
          radius='none'
          isInvalid={validations.password}
          errorMessage={validations.password && 'Нууц үгээ бичнэ үү'}
          className='text-start'
          type='password'
          name='password'
          variant='bordered'
          value={signIn.password}
          onChange={handleChange}
        />
        <Button
          onClick={submit}
          className='border-button mt-3 flex items-center gap-x-1.5 bg-transparent px-3 py-1'
        >
          <ArrowDownTrayIcon width={20} height={20} className='-rotate-90' />
          Нэвтрэх
        </Button>
      </div>
    </div>
  )
}
