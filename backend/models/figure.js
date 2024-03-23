const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const figureSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    type: { type: String, enum: ["Figure", "Nendoroid"], require: true },
    size: {
      type: String,
      require: true,
    },

    product_count: {
      type: Number,
      require: true,
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      require: true,
    },
  },
  { collection: "Figures", versionKey: false }
);
module.exports = mongoose.model("Figure", figureSchema);
