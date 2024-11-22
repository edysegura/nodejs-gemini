import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
import connectToDatabase from './database'

const app: Application = express()
const port = process.env.PORT || 3000

app.use(express.json())

connectToDatabase(process.env.MONGO_URI as string)

app.get('/', (req: Request, res: Response) => {
  res.send('Server running!!')
})

app.listen(port, () => {
  console.log(`Server listening on port https://localhost:${port}`)
})
