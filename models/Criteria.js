const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CriteriaSchema = new Schema({
  criteria: String,
  explanation: String,
  importance: Number,
  label: {type: String, enum: ['Must Have','Super Nice To Have','Nice To Have'] },
  labelImportance: Number,
  value: {type: String, enum: ['YES','NO','NA'] },
});

const Criteria = mongoose.model("Criteria", CriteriaSchema);

module.exports = Criteria;
