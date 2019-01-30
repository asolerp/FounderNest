const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CriteriaSchema = new Schema({
  criteria: "Growing traction"
  explanation: "Visit-to-sales ratio of 10% with 10% monthly growth"
  importance: 100
  label: "Nice To Have"
  labelImportance: 3
  value: "YES"
});

const Criteria = mongoose.model("Criteria", CriteriaSchema);
module.exports = Criteria;
