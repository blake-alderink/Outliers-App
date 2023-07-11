const express = require("express");
const pool = require("./db");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("./config/secrets");

const router = express.Router();

router.use(express.json());
// router.use(cors());

router.post("/loginUser", async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows[0] && bcrypt.compareSync(password, user.rows[0].pass)) {
      req.session.user = user.rows[0];
      console.log(req.session.user, "req.session.user");

      // const token = generateToken(user.rows[0]);
      res.status(200).json(user);
    } else {
      res.status(404).json({ errorMessage: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }

  // function generateToken(user) {
  //   const payload = {
  //     subject: user.user_id,
  //     username: user.username,
  //   };

  //   const options = {
  //     expiresIn: "1d", // show other available options in the library's documentation
  //   };

  //   // extract the secret away so it can be required and used where needed
  //   return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  // }
});

router.post("/createUser", async (req, res) => {
  try {
    let { username, password } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    console.log(userExists);
    if (userExists.rows[0]) {
      console.log("this username is takennnn");

      res.status(409).json("this username is taken");
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

      req.session.user = user.rows[0];
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message, "hiiiilkjli");
    res.status(401).json(error.message, "uhhhhh");
  }
});

module.exports = router;
