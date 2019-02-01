const express = require("express");
const router = express.Router();

const Investor = require("../models/Investor");
const Company = require("../models/Company");
const Criteria = require("../models/Criteria");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "welcome to the first page!" });
});

/* GET All StartUps from Investor */

router.post("/allCompanies", (req, res, next) => {
  Investor.find({ _id: req.body.id })
    // Populate to get comapnies info
    .populate({
      path: "companies",
      // Deep populate to get criterias of each company
      populate: { path: "criterias" }
    })
    .then(investor => {
      res.status(200).json(investor[0].companies);
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

/* Set Action on Company */

router.post("/setActionToCompany", (req, res, next) => {
  Company.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { callToAction: req.body.action }}, {new: true})
    .then(company => {
        res.status(200).json(company);
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
;
});

/* Update Criteria */

router.post("/updateCriterias", (req, res, next) => {

var updateCriterias = req.body.criterias.map(criteria => {
    return Criteria.findOneAndUpdate({"_id": criteria._id}, {"$set": {"value": criteria.value }}, {new: true});       
});

Promise.all(updateCriterias)
.then(resultUpdate => {
  res.status(200).json(resultUpdate)
})
.then(err => {
  res.status(500).json({message: err})
}); 

});


module.exports = router;




