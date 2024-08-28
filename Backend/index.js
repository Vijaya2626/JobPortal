//imports

import swaggerUI, { serve } from 'swagger-ui-express';
import swaggerDoc from 'swagger-doc';
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js';
import testRoutes from './routes/testRoute.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoute.js'
import userRoutes from './routes/userRoutes.js';

//config
dotenv.config();
//mongodb connection
connectDB();

//swagger api conflig


const app = express();
//middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//homeroute root


//validation
app.use(errorMiddleware);
//port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(
        `Node server running In ${process.env.DEV_MODE} mode  on port no ${PORT}`.bgMagenta.white
    );
});