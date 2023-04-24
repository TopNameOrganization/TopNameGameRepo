import { RequestHandler } from 'express'

import { YandexAPI } from './yandex-api'

export const authMiddleware: RequestHandler = async (req, res, next) => {
  // TODO get cookie and check auth to yandex api
  const sendNoAccess = () =>
    res.status(401).send({ message: 'User authorization is failed' })
  const cookie = req.headers.cookie

  if (cookie) {
    const yandexApi = new YandexAPI(cookie)

    try {
      await yandexApi.authUser()
      next()
    } catch (error) {
      sendNoAccess()
    }
  } else {
    sendNoAccess()
  }
}
