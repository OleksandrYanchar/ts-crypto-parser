// src/routes/router.ts
import { Router } from 'express';
import { parseCryptoData,  getAllReports } from '../controllers/parserControllers.js';  

const parserRouter = Router();

parserRouter.post('/crypto', parseCryptoData);  // Assuming you want to handle POST requests

parserRouter.get('/reports', getAllReports);

export default parserRouter;


