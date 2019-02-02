const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  
  callToAction: { type: String, default: [""] },
  href: {type: String, required: true},
  html: {type: String, required: true},
  id: {type: String, required: true},
  informative: {type: Number, required: true},
  informative: {type: Number, required: true},
  criterias: [{ type: Schema.Types.ObjectId, ref: "Criteria" }],
  mustHaveScore: {type: String, required: true},
  mustHaveScorePositions: {type: Number, required: true},
  na: {type: Number, required: true},
  name: {type: String, required: true},
  netScore: {type: String, required: true},
  netScorePositions: {type: Number, required: true},
  niceToHaveScore: {type: Number, required: true},
  superNiceToHaveScore: {type: Number, required: true}

});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
