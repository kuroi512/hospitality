import './globals.scss'
import localFont from 'next/font/local'
import Navbar from '@/components/layout/navbar'
import StyledRegistry from '@/lib/antd-registry'
import theme from '@/utils/antd'
import Loading from './loading'
import { Provider as NextUIProvider } from '@/lib/next-ui'
import { ConfigProvider, App } from 'antd'
import { UserContextProvider } from '@/context/user'
import { Suspense } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'

const hospitalityFont = localFont({ src: '../public/fonts/nunito-sans.ttf' })

export const metadata: Metadata = {
  title: 'Hospitality',
  description: 'Welcome to Hospitality',
  metadataBase: new URL('https://hospitality.mn'),
  keywords: [
    'horeca',
    'horeca institute',
    'horeca mongolia',
    'зочлох үйлчилгээ',
    'сургалт',
    'hotel',
    'restaurant',
    'camp',
    'horeca soft',
    'horecasoft',
    'horecamongolia',
    'horecainstitute',
    'hospitalityskills.mn',
    'hospiskills',
    'зочлох үйлчилгээ сургалт',
    'hospitality',
    'hospitality.mn',
    'hospitality mongolia',
    'horeca hospitality'
  ],
  openGraph: {
    title: 'Hospitality',
    siteName: 'Hospitality',
    description: 'Welcome to Hospitality',
    url: 'https://hospitality.mn',
    images: ['https://hospitality.mn/images/logo.png'],
    type: 'website'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-smooth dark'>
      <body className={hospitalityFont.className}>
        <Suspense fallback={<Loading />}>
          <App>
            <UserContextProvider>
              <StyledRegistry>
                <ConfigProvider theme={theme}>
                  <NextUIProvider>
                    <Navbar />
                    <main>{children}</main>
                  </NextUIProvider>
                </ConfigProvider>
              </StyledRegistry>
            </UserContextProvider>
          </App>
        </Suspense>
        <GoogleAnalytics gaId='G-8EBQLEJZH7' />
      </body>
    </html>
  )
}
