const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');

dotenv.config();

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Connect to MongoDB database (locally)
mongoose
  .connect('mongodb://127.0.0.1:27017/merndb')
  .then(() => {
    console.log('Connected Successfully');
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log(`Running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => console.log('Failed to connect', error));

app.use(userRouter);
