const express = require("express");
const pool = require("./db");
const cors = require("cors");

const router = express.Router();

router.use(express.json());
// router.use(cors());

router.get("/", async (req, res) => {
  const outliers = await pool.query(
    "SELECT * FROM outliers JOIN bets ON outliers.bet_id = bets.bet_id"
  );

  res.json(outliers.rows);
});

router.post("/", async (req, res) => {
  const { bet_id, bookmaker, betting_line, average_line, sport } = req.body;

  const newOutlier = await pool.query(
    "INSERT INTO outliers (outlier_line, average_line, bookmaker, bet_id, sport) VALUES($1,$2,$3,$4, $5)",
    [betting_line, average_line, bookmaker, bet_id, sport]
  );

  res.json(newOutlier.rows);
});

module.exports = router;
