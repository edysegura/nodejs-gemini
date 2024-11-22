import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Response } from 'express'
import routes from './routes/posts'

const app: Application = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (_, res: Response) => {
  res.send('Server running!!')
})

routes(app)

app.listen(port, () => {
  console.log(`Server listening on port https://localhost:${port}`)
})
