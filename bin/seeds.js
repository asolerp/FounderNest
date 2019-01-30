require("dotenv").config();

const mongoose = require("mongoose");
const Category = require("../models/Category");
const User = require('../models/User')

// Connection to the DB

mongoose
  .connect(
    process.env.DB,
    { useNewUrlParser: true }
  )
  .then(db => {
    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });


  // Seed of User

let User = {
  
    id: 001,
    firstName: "Tony",
    lastName: "Stark",
    emailAddress: " tony@stark-industries.com",
    pictureUrl: "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjAx-7p4ZXgAhUw2eAKHai6B6IQjRx6BAgBEAU&url=https%3A%2F%2Fwww.nathanrabin.com%2Fhappy-place%2F2017%2F6%2F6%2F14-reasons-iron-man-is-the-best-avenger&psig=AOvVaw1iRrMQqGx-MUzOaeaYR7gV&ust=1548946578715959",
    phoneNumber: "696 69 69 69",
    companies: []
  }

  // Seed of Companies


User.deleteMany()
  .then(() => {
    return User.create(categories);
  })
  .then(userCreated => {
    console.log(
      `${userCreated.length} users created with the following id:`
    );
    console.log(userCreated.map(user => user._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });