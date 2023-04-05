// 在真实环境中, 如果使用firebase这种第三方auth服务的话, 这里就不需要自己写了

import axios from 'axios'
import { User } from 'types/User'

const localStorageKey = '__auth_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = async (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/login`, data).then((res) => {
    if (res.status === 200) {
      return handleUserResponse(res.data)
    } else {
      return Promise.reject(res.data)
    }
  })
}
export const register = async (data: { username: string; password: string }) => {
  return axios.post(`${apiUrl}/register`, data).then((res) => {
    if (res.status === 200) {
      return handleUserResponse(res.data)
    } else {
      return Promise.reject(res.data)
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
