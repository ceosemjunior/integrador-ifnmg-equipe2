import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { env } from './env/index';
import routes from './routes/index.route'
import { errorHandler } from './middlewares/error-handler';

const app = express();
const port = env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log('API Rodando com sucesso!')
  console.log(`localhost: http://localhost:${env.PORT}`);
})
