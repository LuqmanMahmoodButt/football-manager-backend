import 'dotenv/config';
import { port } from './config/environment.js';
import playerRouter from './controllers/players.js';
import express from 'express';
import { connectToDb } from './db/helpers.js';
import authRouter from './controllers/auth.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

const app = express();

app.use(express.json());
app.use('/', logger);

app.use('/api',authRouter)
app.use('/api',playerRouter)
app.use(errorHandler);

async function startServer() {
    try {
      await connectToDb();
      console.log('⚽Database connected');
      app.listen(port, () => console.log(`⚽Listening on Port: ${port}`));
    } catch (err) {
      console.log('⚽Oh no something went wrong');
      console.log(err);
    }
  }

  startServer();