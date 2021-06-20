const express = require("express");
const router = express.Router();
const { database } = require("../config/helpers");
const crypto = require("crypto");

// GET ALL ORDERS
router.get("/", (req, res) => {
  try {
    database
      .table("orders_details as od")
      .join([
        {
          table: "orders as o",
          on: "o.id = od.order_id",
        },
        {
          table: "products as p",
          on: "p.id = od.product_id",
        },
        {
          table: "users as u",
          on: "u.id = o.user_id",
        },
      ])
      .withFields(["o.id", "p.title", "p.description", "p.price", "u.username"])
      .getAll()
      .then((orders) => {
        if (orders.length > 0) {
          res.json(orders);
        } else {
          res.json({ message: "No orders found" });
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

// Get Single Order
router.get("/:id", async (req, res) => {
  try {
    let orderId = req.params.id;
    database
      .table("orders_details as od")
      .join([
        {
          table: "orders as o",
          on: "o.id = od.order_id",
        },
        {
          table: "products as p",
          on: "p.id = od.product_id",
        },
        {
          table: "users as u",
          on: "u.id = o.user_id",
        },
      ])
      .withFields([
        "o.id",
        "p.title",
        "p.description",
        "p.price",
        "p.image",
        "od.quantity as quantityOrdered",
      ])
      .filter({ "o.id": orderId })
      .getAll()
      .then((orders) => {
        console.log(orders);
        if (orders.length > 0) {
          res.json(orders);
        } else {
          res.json({ message: "No orders found" });
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

// Place New Order
router.post("/new", async (req, res) => {
  try {
    let { userId, products } = req.body;

    if (userId !== null && userId > 0) {
      const newOrderId = await database.table("orders").insert({
        user_id: userId,
      });
      if (newOrderId > 0) {
        products.forEach(async (p) => {
          let data = await database
            .table("products")
            .filter({ id: p.id })
            .withFields(["quantity"])
            .get();

          let inCart = parseInt(p.incart);

          // Deduct the number of pieces ordered from the quantity in database

          if (data.quantity > 0) {
            data.quantity = data.quantity - inCart;

            if (data.quantity < 0) {
              data.quantity = 0;
            }
          } else {
            data.quantity = 0;
          }

          // Insert order details w.r.t the newly created order Id
          const newId = await database.table("orders_details").insert({
            order_id: newOrderId,
            product_id: p.id,
            quantity: inCart,
          });

          const successNum = await database
            .table("products")
            .filter({ id: p.id })
            .update({
              quantity: data.quantity,
            });
        });
      } else {
        res.json({
          message: "New order failed while adding order details",
          success: false,
        });
      }
      res.json({
        message: `Order successfully placed with order id ${newOrderId}`,
        success: true,
        order_id: newOrderId,
        products: products,
      });
    } else {
      res.json({ message: "New order failed", success: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

// Payment Gateway
router.post("/payment", (req, res) => {
  setTimeout(() => {
    res.status(200).json({ success: true });
  }, 3000);
});

module.exports = router;
