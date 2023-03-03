const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientsRouter = require('./routes/patients');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/patients', patientsRouter);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
      });
  console.log("MongoDB database connection established successfully");
})

