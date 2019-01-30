const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  
  callToAction: { type: String, default: [""] },
  href: String,
  html: String,
  id: String,
  informative: Number,
  informative: Number,
  criterias: [{ type: Schema.Types.ObjectId, ref: "Criteria" }],
  mustHaveScore: String,
  mustHaveScorePositions: Number,
  na: Number,
  name: String,
  netScore: String,
  netScorePositions: Number,
  niceToHaveScore: Number,
  superNiceToHaveScore: Number
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
