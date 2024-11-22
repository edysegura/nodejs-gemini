import { Application } from 'express'
import listPosts from '../controllers/posts'

const routes = (app: Application) => {
  app.get('/posts', listPosts)
}

export default routes
