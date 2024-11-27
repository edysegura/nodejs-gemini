import { Db, MongoClient } from 'mongodb'

let mongoClient: MongoClient | null = null
let database: Db | null = null

async function connectToDatabase(connectionString: string = process.env.MONGO_URI as string) {
  if (mongoClient) return mongoClient
  try {
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

export default async function getDatabase(
  connectionString: string = process.env.MONGO_URI as string,
  dbName: string = 'instabytes',
) {
  if (database) return database
  const client = await connectToDatabase(connectionString)
  database = client.db(dbName)
  return database
}
