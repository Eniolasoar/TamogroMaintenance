import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';


import initLogin from './startup/logger.js';
import initDB from './startup/db.js';
import initValidation from './startup/validation.js';
import initRoutes from './startup/routes.js';


dotenv.config();
const app = express();

app.use(express.json());
initLogin();
initValidation();
initDB();
initRoutes(app);


const port = process.env.PORT || 5000;
app.listen(port, ()=>  console.log(`Server is running on ${port}`));
