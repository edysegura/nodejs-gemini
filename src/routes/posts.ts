import { Application } from 'express'
import multer from 'multer'
import { createPost, imageUpload, listPosts } from '../controllers/posts'

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
  app.get('/posts/:id', (req, res) => {
    res.status(200).json({ message: `Post ID: ${req.params.id}` })
  })
  app.post('/upload', upload.single('image'), imageUpload)
}

export default routes
