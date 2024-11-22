import getDbConnection from '../database/database'

export default async function findPosts() {
  const dbConnection = await getDbConnection()
  const db = dbConnection.db('instabytes')
  return db.collection('posts').find().toArray()
}
