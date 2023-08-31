import axios from 'axios'
import { getCookie } from './cookies'

export const axiosClient = axios.create({
  timeout: 15000
})

const requestIntercepter = async config => {
  const accessToken = getCookie('access_token')

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

const responseIntercepter = response => response

axiosClient.interceptors.request.use(requestIntercepter)
axiosClient.interceptors.response.use(responseIntercepter)
