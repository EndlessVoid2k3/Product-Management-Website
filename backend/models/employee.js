const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const employeeSchema = new Schema(
  {
    CID: {
      type: String,
      require: true,
    },
    Pname: {
      type: String,
      require: true,
    },
    phone: { type: String, require: true },
    ssn: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "sale staff", "finance staff", "support staff"],
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { collection: "Employees", versionKey: false }
);
employeeSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});
module.exports = mongoose.model("Employee", employeeSchema);
