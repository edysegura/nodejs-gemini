import { Request, Response } from 'express'
import findPosts from '../model/posts'

export default async function listPosts(req: Request, res: Response) {
  const posts = await findPosts()
  res.status(200).json(posts)
}
