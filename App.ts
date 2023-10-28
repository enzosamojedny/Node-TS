import express from 'express';
import { Request, Response } from 'express';
import Products from './index';
import morgan from 'morgan';
const app = express();
const port = 3001;

app.use(morgan('dev'))
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my e-commerce!');
});
app.get('/products',Products)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//npx ts-node App.ts
//npx ts-node-dev App.ts will make server automatically restart