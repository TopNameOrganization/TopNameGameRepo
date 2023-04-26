import axios from 'axios'

export class YandexAPI {
  API_ROOT = 'https://ya-praktikum.tech/api/v2/'

  constructor(private cookieHeader: string) {
    this.cookieHeader = cookieHeader
  }

  async authUser() {
    const { data } = await axios.get(`${this.API_ROOT}/auth/user`, {
      headers: {
        cookie: this.cookieHeader,
      },
    })
    return data
  }
}
