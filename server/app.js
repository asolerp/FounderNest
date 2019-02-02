require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser   = require('body-parser');
const config = require('config');
const routes = require('./routes/index')
const morgan = require('morgan');

mongoose
  .connect(
    process.env.DB,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3001']
}));


//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Express View engine setup

// default value for title local
app.locals.title = "FounderNest";

const index = require("./routes/index");

// app.use("/", index);

app.route("/")
  .get(routes.getInvestorCompanies)

app.route("/postAction")
  .post(routes.postActionToCompany)

module.exports = app;
