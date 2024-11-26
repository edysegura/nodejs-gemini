import { Application } from 'express'
import multer from 'multer'
import { createPost, imageUpload, listPosts, updatePost } from '../controllers/posts'

// this code block is necessary only for windows environment
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ dest: './uploads', storage })

const routes = (app: Application) => {
  app.get('/posts', listPosts)
  app.post('/posts', createPost)
  app.post('/upload', upload.single('image'), imageUpload)
  app.put('/upload/:id', updatePost)
}

export default routes
