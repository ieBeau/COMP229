import config from "./config/config.js";
import app from "./express.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected successfully.");
})

mongoose.connection.on('error', () => {
  throw new Error(`⚠️ unable to connect to database: ${config.mongoUri}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

app.listen(config.port, (err) => {
  if (err) console.error(`Error starting server: ${err}`); 
  config.env === 'development'
    ? console.log(`Server running on http://localhost:${config.port}/`)
    : console.log(`Server running on https://moreau-server.onrender.com`);
});

export default app;
