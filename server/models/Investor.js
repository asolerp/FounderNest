const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestorSchema = new Schema(
  {
    id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    pictureUrl: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    companies: [{ type: Schema.Types.ObjectId, ref: "Company",  default: [""] }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Investor = mongoose.model("Investor", InvestorSchema);
module.exports = Investor;