import { Request, Response } from 'express'
import fs from 'fs/promises'
import { findPosts, insertPost, updatePostWithImage } from '../model/posts'

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

export async function imageUpload(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({ message: 'No image provided' })
    return
  }
  const newPost = {
    description: '',
    imgUrl: req.file.originalname,
    alt: '',
  }
  try {
    const result = await insertPost(newPost)
    const imageUpdated = `uploads/${result.insertedId}.png`
    await fs.rename(req.file?.path, imageUpdated)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error })
  }
}

export async function updatePost(req: Request, res: Response) {
  const id = req.params.id
  const imageUrl = `http://localhost:3000/${id}.png`
  const postUpdated = {
    description: 'To be defined',
    imgUrl: imageUrl,
    alt: 'To be defined',
  }
  try {
    const result = await updatePostWithImage(id, postUpdated)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error })
  }
}
