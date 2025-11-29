import config from "./config/config.js";

import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import projectRoutes from './routes/project.route.js';
import educationRoutes from './routes/education.route.js';
import serviceRoutes from './routes/service.route.js';
import contactRoutes from './routes/contact.route.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {}).then(() => {
  console.log("✅ MongoDB connected successfully.");
})

mongoose.connection.on('error', () => {
  throw new Error(`⚠️ unable to connect to database: ${config.mongoUri}`);
});

// Initialize express app
const app = express();

app.use(cors({
    origin: [
        'https://moreau-portfolio.onrender.com'
    ],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', projectRoutes);
app.use('/', educationRoutes);
app.use('/', serviceRoutes);
app.use('/', contactRoutes);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') res.status(401).json({"error" : err.name + ": " + err.message})
    else if (err) res.status(400).json({"error" : err.name + ": " + err.message})
});

app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.listen(config.port, (err) => {
  if (err) console.error(`Error starting server: ${err}`); 
  config.env === 'development'
    ? console.log(`Server running on http://localhost:${config.port}/`)
    : console.log(`Server running on https://moreau-server.onrender.com`);
});

export default app;