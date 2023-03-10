import dotenv from 'dotenv'
import cors from 'cors'
// import path from 'node:path'

dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import ssrMiddleware from './server-render-middleware'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

// app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('/*', ssrMiddleware)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
