const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CriteriaSchema = new Schema({
  criteria: {type: String, required: true},
  explanation: {type: String, required: true},
  importance: {type: Number, required: true},
  label: {type: String, enum: ['Must Have','Super Nice To Have','Nice To Have'] },
  labelImportance: {type: Number, required: true},
  value: {type: String, enum: ['YES','NO','NA'] },
});

const Criteria = mongoose.model("Criteria", CriteriaSchema);

module.exports = Criteria;
