const mongoose = require("mongoose");
const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

// Connection to the DB

mongoose
  .connect("mongodb://localhost/foundernest", { useNewUrlParser: true })
  .then(db => {
    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Seed of User

let newInvestor = {
  id: 001,
  firstName: "Tony",
  lastName: "Stark",
  emailAddress: " tony@stark-industries.com",
  pictureUrl:
    "https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjAx-7p4ZXgAhUw2eAKHai6B6IQjRx6BAgBEAU&url=https%3A%2F%2Fwww.nathanrabin.com%2Fhappy-place%2F2017%2F6%2F6%2F14-reasons-iron-man-is-the-best-avenger&psig=AOvVaw1iRrMQqGx-MUzOaeaYR7gV&ust=1548946578715959",
  phoneNumber: "696 69 69 69",
  companies: []
};

let newCompany = {
  href: "StartupZubat",
  html: "FN_StartupZubat.html",
  id: "StartupZubat",
  informative: 53,
  mustHaveScore: "No-Match",
  mustHaveScorePositions: 2,
  na: 8,
  name: "Zubat",
  netScore: "Low",
  netScorePositions: 5,
  niceToHaveScore: 0.86,
  superNiceToHaveScore: 0.18,
  criterias: []
};

let newCriteria = [
  {
    criteria: "Stage is Seed or Series A",
    explanation: "Seed",
    importance: 100,
    label: "Must Have",
    labelImportance: 1,
    value: "YES"
  },
  {
    criteria: "Founding team has experience in the industry",
    importance: 30,
    label: "Super Nice To Have",
    labelImportance: 2,
    value: "YES"
  }
];

// Insert investors  / companies / criterias inside DB

Investor.deleteMany().then(() => {
  Investor.create(newInvestor).then(investorCreated => {
    Company.deleteMany().then(() => {
      Company.create(newCompany).then(company => {
        Criteria.deleteMany().then(() => {
          Criteria.create(newCriteria).then(criterias => {
            let promiseInvestor = Investor.findOneAndUpdate(
              { _id: investorCreated._id },
              { $push: { companies: company._id } }
            );
            let promiseCriteria = Company.findOneAndUpdate(
              { _id: company._id },
              { $push: { criterias: criterias.map(criteria =>  criteria._id )}}
            );
            Promise.all([promiseInvestor, promiseCriteria]).then(() => {
              mongoose.disconnect();
            });
          });
        });
      });
    });
  });
});
