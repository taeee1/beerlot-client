function getTimeComponents(timestampStr: string) {
  const timestamp = new Date(timestampStr)
  const year = timestamp.getFullYear()
  const month = timestamp.getMonth() + 1
  const day = timestamp.getDate()

  return [year, month, day]
}

export const getLeftTime = (postedTime: string) => {
  const [year, month, day] = getTimeComponents(postedTime)

  const now = new Date()

  const diffInMs = now.getTime() - new Date(postedTime).getTime()
  if (diffInMs >= 24 * 60 * 60 * 1000) {
    return `${year}.${month}.${day}`
  }

  if (diffInMs >= 60 * 60 * 1000) {
    const diffInHours = Math.floor(diffInMs / (60 * 60 * 1000))
    return `${diffInHours}시간 전`
  }

  if (diffInMs >= 60 * 1000) {
    const diffInMinutes = Math.floor(diffInMs / (60 * 1000))
    return `${diffInMinutes}분 전`
  }
  if (diffInMs >= 1000) {
    const diffInMinutes = Math.floor(diffInMs / (60 * 1000))
    return `${diffInMinutes}초 전`
  }
  return `${year}.${month}.${day}`
}
