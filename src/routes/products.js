const express = require("express");
const router = express.Router();
const { database } = require("../config/helpers");

// Get all products
router.get("/", async (req, res) => {
  try {
    const prods = await database
      .table("products as p")
      .join([
        {
          table: "categories as c",
          on: `c.id = p.cat_id`,
        },
      ])
      .withFields([
        "c.title as category",
        "p.title as name",
        "p.price",
        "p.description",
        "p.quantity",
        "p.image",
        "p.id",
      ])
      .slice(0, 10)
      .sort({ id: 0.1 }) // ASC
      .getAll();

    if (prods.length > 0)
      return res.status(200).json({
        count: prods.length,
        products: prods,
      });

    return res.json({ message: "No products found" });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

/* GET ONE PRODUCT*/
router.get("/:prodId", async (req, res) => {
  try {
    let productId = req.params.prodId;
    const prod = await database
      .table("products as p")
      .join([
        {
          table: "categories as c",
          on: `c.id = p.cat_id`,
        },
      ])
      .withFields([
        "c.title as category",
        "p.title as name",
        "p.price",
        "p.quantity",
        "p.description",
        "p.image",
        "p.id",
        "p.images",
      ])
      .filter({ "p.id": productId })
      .get();
    if (prod) {
      res.status(200).json(prod);
    } else {
      res.json({ message: `No product found with id ${productId}` });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

/* GET ALL PRODUCTS FROM ONE CATEGORY */
router.get("/category/:catName", async (req, res) => {
  try {
    // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page =
      req.query.page !== undefined && req.query.page !== 0 ? req.query.page : 1; // check if page query param is defined or not
    const limit =
      req.query.limit !== undefined && req.query.limit !== 0
        ? req.query.limit
        : 10; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
      startValue = page * limit - limit; // 0, 10, 20, 30
      endValue = page * limit; // 10, 20, 30, 40
    } else {
      startValue = 0;
      endValue = 10;
    }

    // Get category title value from param
    const cat_title = req.params.catName;

    const prods = await database
      .table("products as p")
      .join([
        {
          table: "categories as c",
          on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`,
        },
      ])
      .withFields([
        "c.title as category",
        "p.title as name",
        "p.price",
        "p.quantity",
        "p.description",
        "p.image",
        "p.id",
      ])
      .slice(startValue, endValue)
      .sort({ id: 1 })
      .getAll();
    if (prods.length > 0) {
      return res.status(200).json({
        count: prods.length,
        products: prods,
      });
    } else {
      return res.json({
        message: `No products found matching the category ${cat_title}`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

module.exports = router;
