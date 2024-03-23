const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { collection: "Providers", versionKey: false }
);
module.exports = mongoose.model("Provider", providerSchema);
