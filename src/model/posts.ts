import getDB from '../database/database'

export async function findPosts() {
  const db = await getDB()
  return db.collection('posts').find().toArray()
}

export async function insertPost(post: Record<string, unknown>) {
  const db = await getDB()
  return db.collection('posts').insertOne(post)
}
