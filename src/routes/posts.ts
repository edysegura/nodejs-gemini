import { Application } from 'express'
import { createPost, listPosts } from '../controllers/posts'

const routes = (app: Application) => {
  app.get('/posts', listPosts)
  app.post('/posts', createPost)
}

export default routes
