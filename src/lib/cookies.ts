import { getCookie as _getCookie, setCookie as _setCookie, deleteCookie } from 'cookies-next'

const MAX_AGE = 24 * 60 * 60

export const setCookie = (key, value) => {
  _setCookie(key, value, {
    path: '/',
    maxAge: MAX_AGE
  })
}

export const getCookie = key => {
  const value = _getCookie(key, {
    path: '/',
    maxAge: MAX_AGE
  })

  return value
}

export const removeCookie = key => {
  deleteCookie(key, {
    path: '/',
    maxAge: MAX_AGE
  })
}
