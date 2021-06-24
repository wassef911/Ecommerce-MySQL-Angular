const express = require("express");
const router = express.Router();
const { database } = require("../config/helpers");

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    await database
      .table("users")
      .withFields(["username", "email", "fname", "lname", "age", "role", "id"])
      .getAll();
    if (list.length > 0) {
      return res.status(200).json({ users: list });
    } else {
      return res.status(200).json({ message: "NO USER FOUND" });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

/**
 * ROLE 777 = ADMIN
 * ROLE 555 = CUSTOMER
 */

/* GET ONE USER MATCHING ID */
router.get("/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await database
      .table("users")
      .filter({ id: userId })
      .withFields(["username", "email", "fname", "lname", "age", "role", "id"])
      .get();
    if (user) {
      res.json({ user });
    } else {
      res.json({ message: `NO USER FOUND WITH ID : ${userId}` });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

/* UPDATE USER DATA */
router.patch("/:userId", async (req, res) => {
  try {
    let { userId } = req.params;
    let user = await database.table("users").filter({ id: userId }).get();

    if (user) {
      const { email, password, fname, lname, username, age } = req.body;

      // Replace the user's information with the form data ( keep the data as is if no info is modified )
      const result = await database
        .table("users")
        .filter({ id: userId })
        .update({
          email: email !== undefined ? email : user.email,
          password: password !== undefined ? password : user.password,
          username: fname !== undefined ? fname : user.username,
          fname: lname !== undefined ? lname : user.fname,
          lname: username !== undefined ? username : user.lname,
          age: age !== undefined ? age : user.age,
        });
      return res.status(201).json("User updated successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: err.message });
  }
});

module.exports = router;
