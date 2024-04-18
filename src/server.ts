import express, { Request, Response } from 'express';
import parserRouter from './routes/parserRouter.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './configs/swaggerConfig.js'; 
import connectDB  from './configs/db.js';


const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.PARCED_SITE

app.use(express.json());

app.use('/api', parserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/a', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const start = async () => {
  try {
      app.listen(PORT, () => {
          console.log(`Parsing url: ${BASE_URL}...`);        
          console.log(`Server is listening on port ${PORT}...`);
          console.log('Navigate to POST api/crypto to scrape and store data.');
          console.log('API documentation available at /docs');
      });
  } catch (error) {
      console.error('Error connecting to the server:', error);
  }
};
connectDB().then(() => {
  start();
});

export default app;