import { MongoClient } from 'mongodb'

let mongoClient: MongoClient | null = null
export default async function connectToDatabase(connectionString: string = process.env.MONGO_URI as string) {
  if (mongoClient) return mongoClient
  try {
    console.log('Connection string: ' + connectionString)
    mongoClient = new MongoClient(connectionString)
    console.log('Connecting to database cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas!')
    return mongoClient
  } catch (error) {
    console.error('Database connection failed!', error)
    process.exit(1)
  }
}
