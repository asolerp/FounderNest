require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bodyParser   = require('body-parser');

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

// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Express View engine setup

// default value for title local
app.locals.title = "FounderNest";

const index = require("./routes/index");

app.use("/", index);

module.exports = app;
