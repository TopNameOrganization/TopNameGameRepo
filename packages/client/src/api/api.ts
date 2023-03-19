import axios, { AxiosInstance } from 'axios'
import { setAdapterForSSR } from './api-ssr-adapter'

const baseURL = 'https://ya-praktikum.tech/api/v2'

let instance: AxiosInstance
let instanceLocal: AxiosInstance

const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL,
      timeout: 1000,
      withCredentials: true,
    });

    instance.interceptors.response.use(undefined, error => {
      if (error.response.status === '401') {
        window.location.href = '/#/login'
      }
      throw error
    });

    setAdapterForSSR(instance);
  }

  return instance
}

const getInstanceLocal = () => {
  if (!instanceLocal) {
    instanceLocal = axios.create({
      baseURL: '',
      timeout: 1000,
      withCredentials: true,
      responseType: 'blob',
    });
  
    setAdapterForSSR(instanceLocal);
  }

  return instanceLocal
}

export const api = getInstance()
export const apiFile = getInstanceLocal()
