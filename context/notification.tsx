'use client'

import { createContext, useContext } from 'react'
import { notification } from 'antd'

export interface NotificationType {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  description: string
}

const NotificationContext = createContext<NotificationType | any>({})

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [api, contextHolder]: any = notification.useNotification()

  const openNotification = (
    type: string,
    message: string,
    description: string,
  ): void => {
    api[type]({
      message: message,
      description: description,
    })
  }

  return (
    <NotificationContext.Provider value={{ contextHolder, openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () =>
  useContext<{
    contextHolder: any
    openNotification: (
      type: string,
      message: string,
      description: string,
    ) => void
  }>(NotificationContext)
