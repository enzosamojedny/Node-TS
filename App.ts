import express from 'express';
import router from './src/routes/routes';
import http from 'http'
import morgan from 'morgan';
const server = express();
const port = 3001;

const httpServer = http.createServer(server)
server.use(morgan('dev'))
server.use(express.json())
server.use('/',router)
httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default httpServer