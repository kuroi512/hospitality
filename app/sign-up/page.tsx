'use client'

import axios from 'axios'
import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { setToken } from '@/utils/token'
import { message } from 'antd'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/context/user'

export default function SignUp() {
  const { login } = useUserContext()
  const router = useRouter()
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: ''
  })
  const [validations, setValidations] = useState({
    name: false,
    email: false,
    phone_number: false,
    password: false
  })

  const handleChange = (event: any) => {
    setSignUp({ ...signUp, [event.target.name]: event.target.value })
  }

  const validate = () => {
    let isValid = true
    setValidations({
      name: false,
      email: false,
      phone_number: false,
      password: false
    })

    if (!signUp.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
      setValidations((prev) => ({
        ...prev,
        email: true
      }))
      isValid = false
    }
    if (!signUp.name) {
      setValidations((prev) => ({
        ...prev,
        name: true
      }))
      isValid = false
    }
    if (!signUp.phone_number || signUp.phone_number.length < 6) {
      setValidations((prev) => ({
        ...prev,
        phone_number: true
      }))
      isValid = false
    }
    if (!signUp.password || signUp.password.length < 6) {
      setValidations((prev) => ({
        ...prev,
        password: true
      }))
      isValid = false
    }

    return isValid
  }

  const submit = async () => {
    if (validate()) {
      try {
        await axios
          .post(`${process.env.GUEST_API_URL}/auth/register`, signUp, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(({ status, data }) => {
            if (status === 201) {
              setToken(data.token)
              login(data.data)
              message.success('Амжилттай бүртгүүллээ')
              router.push('/')
            }
          })
          .catch(({ response: { status, data } }) => {
            if (status === 409) {
              message.warning('Бүртгэлтэй имэйл байна')
            } else if (status === 422) {
              message.error('Мэдээллээ гүйцэт бөглөнө үү')
            }
          })
      } catch (error) {}
    }
  }

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center bg-content text-white'>
      <div className='absolute left-0 top-0 z-10 h-full w-full bg-lines'></div>
      <p className='text z-20 my-4 text-4xl font-bold'>Сайтад бүртгүүлэх</p>
      <div className='z-20 mt-2 flex w-96 flex-col items-center justify-center gap-y-2 text-center'>
        <Input
          label='Нэр'
          name='name'
          isInvalid={validations.name}
          errorMessage={validations.name && 'Нэрээ бичнэ үү'}
          className='text-start'
          autoComplete='off'
          variant='bordered'
          radius='none'
          value={signUp.name}
          onChange={handleChange}
        />
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
          value={signUp.email}
          onChange={handleChange}
        />
        <Input
          label='Утасны дугаар'
          type='number'
          name='phone_number'
          radius='none'
          isInvalid={validations.phone_number}
          errorMessage={validations.phone_number && 'Утасны дугаараа бичнэ үү'}
          className='text-start'
          autoComplete='off'
          variant='bordered'
          value={signUp.phone_number}
          onChange={handleChange}
        />
        <Input
          label='Нууц үг'
          radius='none'
          isInvalid={validations.password}
          errorMessage={
            validations.password && 'Нууц үгээ бичнэ үү. Урт: 6-аас дээш'
          }
          className='text-start'
          type='password'
          name='password'
          variant='bordered'
          value={signUp.password}
          onChange={handleChange}
        />
        <Button
          onClick={submit}
          className='border-button mt-3 flex items-center gap-x-1.5 bg-transparent px-3 py-1'
        >
          <ArrowDownTrayIcon width={20} height={20} className='-rotate-90' />
          Бүртгүүлэх
        </Button>
      </div>
    </div>
  )
}
