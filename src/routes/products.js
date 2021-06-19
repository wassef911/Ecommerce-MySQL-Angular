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

module.exports = router;
