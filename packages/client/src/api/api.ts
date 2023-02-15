import axios, { AxiosInstance } from 'axios'

const baseURL = 'https://ya-praktikum.tech/api/v2'

let instance: AxiosInstance

const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL,
      timeout: 1000,
      withCredentials: true,
    })
    instance.interceptors.response.use(undefined, error => {
      if (error.response.status === '401') {
        window.location.href = '/#/login'
      }
      throw error
    })
  }

  return instance
}

export const api = getInstance()
