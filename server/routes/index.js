const mongoose = require("mongoose");

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

const messages = [
  "Action make!",
  "Criteria updated!"
]


/*
 * GET / all companies of a specific investor.
 */

getInvestorCompanies = (req, res, message) => {
  Investor.find({ _id: req.body.idInvestor })
    // Populate to get comapnies info
    .populate({
      path: "companies",
      // Deep populate to get criterias of each company
      populate: { path: "criterias" }
    })
    .then(investor => {
      res.status(200).json({message: message , companies:  investor[0].companies})
    })
    .catch(err => {
      res.status(500).json({message: "Investor does not found"})
    });
};


/*
 * POST /action to a company.
 */

postActionToCompany = (req, res) => {
  Company.findOneAndUpdate(
    { _id: req.body.idCompany },
    { $set: { callToAction: req.body.action } },
    { new: true }
  )
    .then(result => {
      result !== null ?  getInvestorCompanies(req, res, messages[0]) : res.status(500).json({message: "Company inexistent"});
    })
    .catch(err => {
      res.status(500).json({message: "Error trying to make an action"});
    });
};


/*
 * POST / update criterias of a company.
 */

postCriterias = (req, res) => {
  req.body.criterias.map(criteria => {
    Criteria.findOneAndUpdate(
      { _id: criteria._id },
      { $set: { value: criteria.value } },
      { new: true }
    )
      .then(() => {
        getInvestorCompanies(req, res, messages[1]);
      })
      .catch(err => {
        res.status(500).json({ message: err });
      })
  })
}

//export all the functions
module.exports = {
  getInvestorCompanies,
  postActionToCompany,
  postCriterias
};
