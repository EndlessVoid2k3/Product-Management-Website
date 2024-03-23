const mongoose = require("mongoose");
const Customer = require("./customer.js");
const Book = require("./book.js");
const Figure = require("./figure.js");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    quantity: {
      type: Number,
      require: true,
    },
    delivered: {
      type: Boolean,
      require: true,
    },
    order_date: {
      type: Date,
      require: true,
    },
    delivery_price: { type: Number, require: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      require: true,
    },

    products_book: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Book" },
        count: { type: Number, require: true, min: 0 },
      },
    ],
    products_figure: [
      {
        product_id: { type: Schema.Types.ObjectId, ref: "Figure" },
        count: { type: Number, require: true, min: 0 },
      },
    ],
  },
  { collection: "Orders", versionKey: false }
);
module.exports = mongoose.model("Order", orderSchema);
