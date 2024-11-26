import { ObjectId } from 'mongodb'
import getDB from '../database/database'

export async function findPosts() {
  const db = await getDB()
  return db.collection('posts').find().toArray()
}

export async function insertPost(post: Record<string, unknown>) {
  const db = await getDB()
  return db.collection('posts').insertOne(post)
}

export async function updatePostWithImage(id: string, updatedPost: Record<string, unknown>) {
  const db = await getDB()
  return db.collection('posts').updateOne({ _id: new ObjectId(id) }, { $set: updatedPost })
}
