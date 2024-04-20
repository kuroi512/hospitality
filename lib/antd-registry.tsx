'use client'

import React from 'react'
import { StyleProvider } from '@ant-design/cssinjs'
import { NotificationContextProvider } from '@/context/notification'

const StyledRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyleProvider hashPriority='high'>
      <NotificationContextProvider>{children}</NotificationContextProvider>
    </StyleProvider>
  )
}

export default StyledRegistry
