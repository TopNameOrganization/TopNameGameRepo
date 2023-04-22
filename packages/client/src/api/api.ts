import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { setAdapterForSSR } from './api-ssr-adapter'

const baseURLYandex = '/api/v2'
const baseURLServer = '/api/forum'
const baseURLLocal = '';

const instances: Record<string, AxiosInstance> = {};

const getInstance = (baseURL: string) => {
  if (!instances[baseURL]) {
    const config: CreateAxiosDefaults = {
      baseURL,
      timeout: 1000,
      withCredentials: true,
    }
    if (baseURL === baseURLLocal) {
      config.responseType = 'blob'
    }
    instances[baseURL] = axios.create(config)
    instances[baseURL].interceptors.response.use(undefined, error => {
      if (error.response.status === '401') {
        window.location.href = '/#/login'
      }
      throw error
    });

    setAdapterForSSR(instances[baseURL]);
  }

  return instances[baseURL]
}

export const api = getInstance(baseURLYandex)
export const apiServer = getInstance(baseURLServer)
export const apiFile = getInstance(baseURLLocal)
