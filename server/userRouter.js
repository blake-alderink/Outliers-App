const express = require("express");
const pool = require("./db");
const cors = require("cors");
const restricted = require("./middleware/restricted-middleware");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  if (req.session && req.session.user) {
    const username = req.session.user.username;
    try {
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      res.json(user.rows[0]);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.json(false);
  }
});

//state could just be set upon login... and then you go to the home page where the endpoints are just gotten through home/favorites.  the post would be INSERT INTO favorites new record with userid "", bet id that matches what is for the card component.  this will automatically add it to the favorites list

module.exports = router;
