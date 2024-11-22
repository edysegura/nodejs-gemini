import dotenv from 'dotenv'
dotenv.config()

import express, { Application, Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import connectToDatabase from './database'

const app: Application = express()
const port = process.env.PORT || 3000

app.use(express.json())

let dbConnection: MongoClient | null = null
async function getDbConnection() {
  if (!dbConnection) {
    dbConnection = await connectToDatabase(process.env.MONGO_URI as string)
  }
  return dbConnection
}

async function getPosts() {
  const dbConnection = await getDbConnection()
  const db = dbConnection.db('instabytes')
  return db.collection('posts').find().toArray()
}

app.get('/', (req: Request, res: Response) => {
  res.send('Server running!!')
})

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await getPosts()
  res.json(posts)
})

app.listen(port, () => {
  console.log(`Server listening on port https://localhost:${port}`)
})
