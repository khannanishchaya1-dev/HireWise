const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);


module.exports = app;