import express from 'express';
import cors from 'cors';
import propertyListingRoutes from "src/routes/propertyListings"
import { roleMiddleware } from './middlewares/role';
import { AuthRequest } from './middlewares/role/index.d';
import { errorHandler } from './middlewares/error';
import 'dotenv/config';

const APP_PORT = process.env.APP_PORT;

const app = express();

app.use(cors());

app.use((req, res, next) => roleMiddleware(req as AuthRequest, res, next));
app.use("/listings", propertyListingRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(APP_PORT, () => console.log(`Listening to api requests on ${APP_PORT}`));
}

export default app;