'use server'

import { cookies } from 'next/headers'

import type { User } from '@/context/user'

export async function getUserData(): Promise<User> {
  const jsonData: any = cookies().get('hospitality-user-data')?.value

  return jsonData
    ? JSON.parse(jsonData)
    : {
        id: null,
        name: '',
        avatar_url: '',
        email: '',
        language: ''
      }
}

export async function setUserData(userData: any) {
  cookies().set('hospitality-user-data', JSON.stringify(userData), {
    secure: true
  })
}
