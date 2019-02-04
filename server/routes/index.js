const mongoose = require("mongoose");
mongoose.Promise = require('bluebird'); 

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");
const mathScore = require('../utils/mathScore')

const messages = ["Action make!", "Criteria updated!"];

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
      res.status(200)
        .json({ message: message, companies: investor[0].companies });
    })
    .catch(err => {
      res.status(500).json({ message: "Investor does not found" });
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
      result !== null
        ? getInvestorCompanies(req, res, messages[0])
        : res.status(500).json({ message: "Company inexistent" });
    })
    .catch(err => {
      res.status(500).json({ message: "Error trying to make an action" });
    });
};

/*
 * POST / update criterias of a company.
 */

postCriterias = (req, res) => {

  let countOfMustHave = mathScore.calculateTotalLabels("Must Have", req.body.criterias)
  let countOfSuperNiceToHave = mathScore.calculateTotalLabels("Super Nice To Have", req.body.criterias)
  let countOfNiceToHave = mathScore.calculateTotalLabels("Nice To Have", req.body.criterias)


  let promiseCompany = Company.findByIdAndUpdate(
    {_id: req.body.idCompany},
    { $set: { mustHaveScore: (countOfMustHave/req.body.criterias.length), superNiceToHaveScore:  (countOfSuperNiceToHave/req.body.criterias.length),niceToHaveScore:   (countOfNiceToHave/req.body.criterias.length)   } },
    { new: true }
  )

  let promisesCriteria = req.body.criterias.map(criteria => {
    return Criteria.findOneAndUpdate(
      { _id: criteria._id },
      { $set: { value: criteria.value } },
      { new: true }
    )
  });

  Promise.all([promiseCompany, promisesCriteria])
  .then(result => {
    result !== null
      ? getInvestorCompanies(req, res, messages[1])
      : res.status(500).json({ message: "This criteria does not exist" });
  })
  .catch(err => {
    res.status(500).json({ message: "Error trying to update criterias" });
  });
};

//export all the functions
module.exports = {
  getInvestorCompanies,
  postActionToCompany,
  postCriterias
};
