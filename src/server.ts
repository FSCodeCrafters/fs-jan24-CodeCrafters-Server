'use strict'

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const server = express()

server.use(cors({ origin: '*' }))

server.get('/', (req, res) => {
  res.send('Hello, World!')
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
