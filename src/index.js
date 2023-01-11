import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cakesRoute from './routes/cakesRoute.js';
import clientsRoute from './routes/clientsRoute.js';
import orderRoute from './routes/orderRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cakesRoute);
app.use(clientsRoute);
app.use(orderRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));