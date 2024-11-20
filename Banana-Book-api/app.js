const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/api/index.router");

require('dotenv').config();
const mongoose = require('./config/mongoose');

const app = express();
const port = process.env.PORT;

//Conexion a mongoDB
mongoose.connect();

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', apiRouter);

//Listener

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
