import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import config from "./config/config.js";

import contactRoutes from './routes/contact.route.js';
import projectRoutes from './routes/project.route.js';
import educationRoutes from './routes/education.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', contactRoutes);
app.use('/', projectRoutes);
app.use('/', educationRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') res.status(401).json({"error" : err.name + ": " + err.message})
    else if (err) res.status(400).json({"error" : err.name + ": " + err.message})
});

export default app;
