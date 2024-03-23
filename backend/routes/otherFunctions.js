const router = require("express").Router();
const Order = require("../models/order.js");
const Provider = require("../models/provider.js");
const Customer = require("../models/customer.js");
const Book = require("../models/book.js");
const Figure = require("../models/figure.js");
const { userVerification } = require("../middlewares/AuthMiddleware.js");
const getTotalprice = (products, figures) => {
  let total = 0;
  for (const product of products) {
    total = total + product.count * product.product_id.price;
  }
  for (const figure of figures) {
    total = total + figure.count * figure.product_id.price;
  }
  return total;
};
router.get("/customers", userVerification, async (req, res) => {
  try {
    const result = await Customer.find({}).sort({ _id: 1 });

    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "There are no customers at the moment" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/customers/:id", userVerification, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Customer.findOne({ id });

    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "There is no such customer exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/orders", userVerification, async (req, res) => {
  try {
    const result = await Order.find({})
      .sort({ _id: -1 })
      .populate("customer")
      .populate({
        path: "products_book",
        populate: {
          path: "product_id",
          model: "Book",
        },
      })
      .populate({
        path: "products_figure",
        populate: {
          path: "product_id",
          model: "Figure",
        },
      });
    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "There are no orders at the moment" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/orders/:_id", userVerification, async (req, res) => {
  const { _id } = req.params;
  try {
    const result = await Order.findOne({ _id })

      .populate("customer")
      .populate({
        path: "products_book",
        populate: {
          path: "product_id",
          model: "Book",
        },
      })
      .populate({
        path: "products_figure",
        populate: {
          path: "product_id",
          model: "Figure",
        },
      });
    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "There are no orders at the moment" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/providers", userVerification, async (req, res) => {
  try {
    const result = await Provider.find({}).sort({ _id: -1 });

    if (result) {
      res.status(200).json(result);
    } else {
      res.json({ message: "There are no providers at the moment" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/filterCustomers", async (req, res) => {
  const { name, mail, phone } = req.query;

  try {
    const fullCus = await Customer.find({}).sort({ _id: -1 });
    let filteredCus = fullCus;
    let checke = 0;
    if (name != "undefined" && name && checke == 0) {
      filteredCus = fullCus.filter((s) =>
        s.Cname.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (filteredCus.length == 0) {
      (filteredCus = fullCus), (checke = 1);
    }
    let filteredCus1 = filteredCus;

    if (mail != "undefined" && mail && checke == 0) {
      filteredCus1 = filteredCus1.filter((s) =>
        s.Email.toLowerCase().includes(mail.toLowerCase())
      );
    }
    if (filteredCus1.length == 0) {
      (filteredCus1 = fullCus), (checke = 1);
    }
    let filteredCus2 = filteredCus1;
    if (phone != "undefined" && phone && checke == 0) {
      filteredCus2 = filteredCus2.filter((s) =>
        s.Receipt_Info.some((RIelement) =>
          RIelement.Phone_Number.toLowerCase().includes(phone.toLowerCase())
        )
      );
    }
    if (filteredCus2.length == 0) filteredCus2 = fullCus;

    res.json(filteredCus2);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/filterOrders", async (req, res) => {
  const {
    name,
    price_start,
    price_end,
    quantity_start,
    quantity_end,
    date_start,
    date_end,
    isDelivered,
  } = req.query;

  const date1 = new Date(date_start);
  const date2 = new Date(date_end);
  try {
    const fullOrders = await Order.find({})
      .sort({ _id: -1 })
      .populate("customer")
      .populate({
        path: "products_book",
        populate: {
          path: "product_id",
          model: "Book",
        },
      })
      .populate({
        path: "products_figure",
        populate: {
          path: "product_id",
          model: "Figure",
        },
      });

    let finalResult = [];
    for (const filteredOrder of fullOrders) {
      console.log(filteredOrder)
      if (
        name != "undefined" &&
        filteredOrder.customer.Cname.indexOf(name) == -1
      ) {
        continue;
      }

      if (
        price_start != "undefined" &&
        getTotalprice(
          filteredOrder.products_book,
          filteredOrder.products_figure
        ) +
        filteredOrder.delivery_price <
        price_start
      ) {
        continue;
      }
      if (
        price_end != "undefined" &&
        getTotalprice(
          filteredOrder.products_book,
          filteredOrder.products_figure
        ) +
        filteredOrder.delivery_price >
        price_end
      ) {
        continue;
      }
      if (
        quantity_start != "undefined" &&
        filteredOrder.quantity < quantity_start
      ) {
        continue;
      }
      if (
        quantity_end != "undefined" &&
        filteredOrder.quantity > quantity_end
      ) {
        continue;
      }
      if (date_start != "undefined" && filteredOrder.order_date < date1) {
        continue;
      }
      if (date_end != "undefined" && filteredOrder.order_date > date2) {
        continue;
      }
      if (isDelivered != filteredOrder.delivered.toString()) {
        continue;
      }
      finalResult.push(filteredOrder);
    }
    res.json(finalResult);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/filterProducts", async (req, res) => {
  const {
    name,
    price_start,
    price_end,
    quantity_start,
    quantity_end,
    genre_type,
  } = req.query;
  let genre_type1 = genre_type.split(",");
  if (genre_type1[0] == "") {
    genre_type1 = [];
  }
  console.log(genre_type1);
  try {
    const fullBooks = await Book.find({}).sort({ _id: 1 });
    const fullFigures = await Figure.find({}).sort({ _id: 1 });
    const bigArray = fullBooks.concat(fullFigures);
    let finalResult = [];
    for (const filteredProduct of bigArray) {
      console.log(filteredProduct);
      if (name != "undefined" && filteredProduct.name.indexOf(name) == -1) {
        console.log(1);
        continue;
      }

      if (price_start != "undefined" && filteredProduct.price < price_start) {
        console.log(2);
        continue;
      }
      if (price_end != "undefined" && filteredProduct.price > price_end) {
        console.log(3);
        continue;
      }
      if (
        quantity_start != "undefined" &&
        filteredProduct.product_count < quantity_start
      ) {
        console.log(4);
        continue;
      }
      if (
        quantity_end != "undefined" &&
        filteredProduct.product_count > quantity_end
      ) {
        console.log(5);
        continue;
      }
      let checke = true;
      if (filteredProduct.genre) {
        for (const genre of genre_type1) {
          if (!filteredProduct.genre.includes(genre)) {
            checke = false;
            break;
          }
        }
        console.log(checke);
        console.log(6);
      } else {
        checke = true;
      }

      if (!checke) {
        console.log(7);
        continue;
      }
      finalResult.push(filteredProduct);
    }
    res.json(finalResult);
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
