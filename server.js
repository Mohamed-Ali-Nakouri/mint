// Dotenv handy for local config & debugging
require('dotenv').config()

// Core Express & logging stuff
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const { sequelize } = require("./models");


// Logging
app.use(logger('dev'))


//cors
const cors = require('cors')
const helmet = require('helmet')
app.use(
cors({
origin: (origin, callback) => callback(null, true),
credentials: true,
})
);

//wearing a helmet 

app.use(helmet());

// Parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes & controllers
app.get("/", (req, res) => res.json({ msg: "Welcome to minted api" }));
app.use("/api", require("./src/routes/nft"));

// Catch all route, generate an error & forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  if (req.method != 'GET') {
    err = new Error(`Method ${req.method} not allowed`)
    err.status = 500
  }

  next(err)
})

// Error handler
app.use(function (err, req, res, next) {
  console.error(`### ERROR: ${err.message}`)
  
  res.status(err.status || 500)
  res.json({
    title: 'Error',
    message: err.message,
    error: err,
  })
})

// Get values from env vars or defaults where not provided
let port = process.env.PORT || 3000

// Start the server
app.listen(port || 3000, async () => {
  console.log(`Server Started on port ${port}`);
  await sequelize.authenticate();
  //await sequelize.sync({force:true , alter: true});
  console.log("DB connected");
});

module.exports = app