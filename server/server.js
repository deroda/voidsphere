const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// This configuration allows requests from your deployed Vercel site
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'https://voidsphere.vercel.app' // Your live Vercel URL
  ],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// --- Database Connection ---
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// --- API Routes ---
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');

app.use('/articles', articlesRouter);
app.use('/users', usersRouter);

// --- Starts the server ---
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});