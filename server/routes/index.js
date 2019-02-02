const mongoose = require("mongoose");

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

/*
 * GET / all companies of a specific investor.
 */

getInvestorCompanies = (req, res, data) => {
  Investor.find({ _id: req.body.idInvestor })
    // Populate to get comapnies info
    .populate({
      path: "companies",
      // Deep populate to get criterias of each company
      populate: { path: "criterias" }
    })
    .then(investor => res.status(200).json(investor[0].companies))
    .catch(err => res.status(500).json({ message: err }));
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
    .then(() => {
      getInvestorCompanies(req, res);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
};

/*
 * POST / update criterias of a company.
 */

postCriterias = (req, res) =>
  req.body.criterias.map(criteria => {
    Criteria.findOneAndUpdate(
      { _id: criteria._id },
      { $set: { value: criteria.value } },
      { new: true }
    )
      .then(() => {
        getInvestorCompanies(req, res);
      })
      .catch(err => {
        res.status(500).json({ message: err });
      });
  });

//export all the functions
module.exports = {
  getInvestorCompanies,
  postActionToCompany,
  postCriterias
};
