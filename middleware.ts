import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('hospitality-token')?.value
  const url = new URL(request.url)
  const nextResponse = NextResponse.next()

  if (token) {
    ;('use server')
    const response = await fetch(`${process.env.USER_API_URL}/auth/account`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      const data = await response.json()
      nextResponse.cookies.set({
        name: 'hospitality-user-data',
        value: JSON.stringify(data),
        secure: true
      })
    } else if (response.status === 404 || response.status === 401) {
      nextResponse.cookies.delete('hospitality-token')
      nextResponse.cookies.delete('hospitality-user-data')
    }
  }

  if (token) {
    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
      return NextResponse.redirect(`${process.env.BASE_URL}`)
    } else {
      return nextResponse
    }
  } else {
    if (
      url.pathname === '/sign-in' ||
      url.pathname === '/sign-up' ||
      url.pathname === '/contact-us' ||
      url.pathname === '/' ||
      url.pathname.includes('/content')
    ) {
      return nextResponse
    } else {
      return NextResponse.redirect(`${process.env.BASE_URL}/sign-in`)
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/images|assets|favicon.ico|images|svg|video|fonts).*)'
  ]
}
