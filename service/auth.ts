export const filterAccessToken = (
  cookie?: string,
  query?: string | string[]
) => {
  if (!!cookie) return cookie
  if (typeof query === 'string') return query
  if (Array.isArray(query)) return query[0]
  return ''
}
