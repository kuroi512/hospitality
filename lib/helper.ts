export const formatDate = (date: string): string => {
  const currentDate = new Date()
  const dateTime = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const timeDifferenceInSeconds = Math.floor(
    (currentDate.getTime() - dateTime.getTime()) / 1000
  )

  if (timeDifferenceInSeconds > 0) {
    if (timeDifferenceInSeconds < 60) {
      return timeDifferenceInSeconds === 1
        ? '1 second ago'
        : `${timeDifferenceInSeconds} seconds ago`
    }
    if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60)
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`
    }
    if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600)
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`
    }
    if (timeDifferenceInSeconds < 172800) {
      return 'yesterday'
    }
    const days = Math.floor(timeDifferenceInSeconds / 86400)
    return `${days} days ago`
  }
  if (timeDifferenceInSeconds <= 0) {
    if (timeDifferenceInSeconds > -60) {
      return timeDifferenceInSeconds === -1
        ? '1 second later'
        : `${-timeDifferenceInSeconds} seconds later`
    } else if (timeDifferenceInSeconds > -3600) {
      const minutes = Math.floor(-timeDifferenceInSeconds / 60)
      return minutes === 1 ? '1 minute later' : `${minutes} minutes later`
    } else if (timeDifferenceInSeconds > -86400) {
      const hours = Math.floor(-timeDifferenceInSeconds / 3600)
      return hours === 1 ? '1 hour later' : `${hours} hours later`
    } else if (timeDifferenceInSeconds > -172800) {
      return 'tomorrow'
    }
    const days = Math.floor(-timeDifferenceInSeconds / 86400)
    return `${days} days later`
  }
  return dateTime.toLocaleDateString(undefined, options)
}
