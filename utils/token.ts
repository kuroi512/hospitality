'use server'

import { cookies } from 'next/headers'

export async function getToken() {
  return cookies().get('hospitality-token')?.value || ''
}

export async function setToken(token: any) {
  cookies().set('hospitality-token', token, {
    secure: true
  })
}

export async function deleteToken() {
  cookies().set('hospitality-token', '')
}
