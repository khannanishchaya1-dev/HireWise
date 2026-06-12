const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hire-wise-alpha.vercel.app"
    ],
    credentials: true,
  })
);
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
const featuresRoutes = require('./routes/features.route');

app.use('/api/auth', authRoutes);
app.use('/api/features', featuresRoutes);

module.exports = app;