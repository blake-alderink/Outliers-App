const express = require("express");
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.use(express.json());
router.use(cors());

router.post("/loginUser", async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].pass)) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/createUser", async (req, res) => {
  try {
    let { username, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userExists.rows[0]) {
      res.status(404).json(userExists.rows);
    } else {
      const hash = bcrypt.hashSync(password, 14);
      password = hash;
      await pool.query("INSERT INTO users (username, pass) VALUES($1,$2)", [
        username,
        password,
      ]);
      const user = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
      ]);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
