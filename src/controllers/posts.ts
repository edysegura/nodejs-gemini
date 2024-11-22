import { Request, Response } from 'express'
import { findPosts, insertPost } from '../model/posts'

export async function listPosts(req: Request, res: Response) {
  const posts = await findPosts()
  res.status(200).json(posts)
}

export async function createPost(req: Request, res: Response) {
  const newPost = req.body
  try {
    const result = await insertPost(newPost)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error })
  }
}
