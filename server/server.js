// server/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Make sure mongoose is required

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

// Allow requests from your Vercel frontend
app.use(cors({
    origin: "https://YOUR_VERCEL_APP_URL.vercel.app" 
}));

app.use(express.json());

// --- NEW DATABASE CONNECTION CODE ---
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
// ------------------------------------

const articlesRouter = require('./routes/articles');
app.use('/articles', articlesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});