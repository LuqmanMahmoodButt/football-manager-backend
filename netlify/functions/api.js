import express from 'express';
import teamRouter from '../../controllers/teams.js';
import playerRouter from '../../controllers/players.js';
import authRouter from '../../controllers/auth.js';
import errorHandler from '../../middleware/errorHandler.js';
import logger from '../../middleware/logger.js';
import { connectToDb } from '../../db/helpers.js';
import 'dotenv/config';
import cors from 'cors'
import serverless from 'serverless-http'


const app = express();

app.use(express.json());
app.use(cors())
app.use('/', logger);
app.use('/api',authRouter)
app.use('/api',playerRouter)
app.use('/api',teamRouter)
app.use(errorHandler);

async function startServer() {
    try {
      await connectToDb();
      console.log('⚽Database connected');
    } catch (err) {
      console.log('⚽Oh no something went wrong');
      console.log(err);
    }
  }

  startServer();

  export const handler = serverless(app)