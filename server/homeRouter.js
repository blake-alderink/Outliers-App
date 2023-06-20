const express = require("express");
const pool = require("./db");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
// router.use(cors());

router.get("/favorites/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const favorites = await pool.query(
      "SELECT * FROM favorites JOIN bets ON favorites.bet_ref=bets.bet_id WHERE favorites.user_ref = $1",
      [id]
    );
    res.json(favorites.rows);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
