const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    Cname: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
    },
    Receipt_Info: [
      {
        Phone_Number: { type: String, require: true },
        Address: { type: String, require: true },
        Receiver_name: { type: String, require: true },
      },
    ],
  },
  { collection: "Customers", versionKey: false }
);
module.exports = mongoose.model("Customer", customerSchema);
