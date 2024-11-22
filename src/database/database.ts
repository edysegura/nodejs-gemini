import { Db, MongoClient } from 'mongodb'

let mongoClient: MongoClient | null = null
let database: Db | null = null

export default async function getDatabase(
  connectionString: string = process.env.MONGO_URI as string,
  dbName: string = 'instabytes',
) {
  if (mongoClient && database) return database
  try {
    console.log('Connection string: ' + connectionString)
    mongoClient = new MongoClient(connectionString)
    console.log('Connecting to database cluster...')
    await mongoClient.connect()
    console.log('Successfully connected to MongoDB Atlas!')
    database = mongoClient.db(dbName)
    return database
  } catch (error) {
    console.error('Database connection failed!', error)
    process.exit(1)
  }
}
