import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server running!!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
