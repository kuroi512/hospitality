'use client'

import axios from 'axios'
import { App } from 'antd'
import { createContext, useContext, useState, useEffect } from 'react'
import { getUserData, setUserData } from '@/utils/user'
import { getToken, setToken } from '@/utils/token'

export type User = {
  id: number | null
  name: string
  avatar_url: string
  email: string
  language: string
}

const UserContext = createContext<User | any>({})

export const UserContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { message } = App.useApp()
  const [userData, setData] = useState<User>({
    id: null,
    name: '',
    avatar_url: '',
    email: '',
    language: ''
  })

  useEffect(() => {
    async function getTokenFunction() {
      const userCookieData = await getUserData()
      setData(userCookieData)
    }

    getTokenFunction()
  }, [])

  const updateUserData = (name: string, value: any): void => {
    if (userData.hasOwnProperty(name)) {
      setData({
        ...userData,
        [name]: value
      })
      setUserData(userData)
    }
  }

  const logout = async (bool: boolean) => {
    if (Boolean(bool)) {
      const token = await getToken()
      await axios
        .get(`${process.env.USER_API_URL}/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ status }) => {
          if (status === 200) {
            setToken('')
            setData({
              id: null,
              name: '',
              avatar_url: '',
              email: '',
              language: ''
            })
            setUserData({
              id: null,
              name: '',
              avatar_url: '',
              email: '',
              language: ''
            })
            message.success('Амжилттай гарлаа')
          }
        })
    }
  }

  const login = async (data: User) => {
    setData({
      id: data.id,
      name: data.name,
      avatar_url: data.avatar_url,
      email: data.email,
      language: data.language
    })
    setUserData({
      id: data.id,
      name: data.name,
      avatar_url: data.avatar_url,
      email: data.email,
      language: data.language
    })
  }

  return (
    <UserContext.Provider value={{ userData, updateUserData, logout, login }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () =>
  useContext<{
    userData: User
    updateUserData: (name: string, value: any) => void
    logout: Function
    login: Function
  }>(UserContext)
