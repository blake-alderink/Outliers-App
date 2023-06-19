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

    if (user[0] && bcrypt.compareSync(password, user.pass)) {
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
    const { username, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (userExists) {
      res.status(404).json({ message: "Username already taken" });
    } else {
      const hash = bcrypt(password, 14);
      password = hash;
      await pool.query("INSERT INTO users (username, pass) VALUES($1,$2)", [
        username,
        password,
      ]);
      res.status(200).json({ username: username, password: password });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
