const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Allows us to have environment variables in a .env file
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration to allow requests from your React app
const corsOptions = {
  origin: [
    'http://localhost:3000', // Your local frontend
    'https://voidsphere.vercel.app' // Your live Vercel frontend
  ],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON

// --- Database Connection ---
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
// -------------------------

// --- API Routes ---
const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);
// ------------------

// server/server.js
// ... (after your other routes)

// --- API Routes ---
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users'); // 1. IMPORT

app.use('/articles', articlesRouter);
app.use('/users', usersRouter); // 2. USE
// ------------------

// ... (rest of your file)

// Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});