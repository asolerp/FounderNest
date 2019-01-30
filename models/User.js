const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvestorSchema = new Schema(
  {
    id: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    pictureUrl: String,
    phoneNumber: String,
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