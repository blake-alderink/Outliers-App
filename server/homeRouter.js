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
      "SELECT * FROM favorites JOIN outliers ON favorites.outlier_ref=outliers.outlier_id JOIN bets ON bets.bet_id=outliers.bet_id WHERE favorites.user_ref = $1",
      [id]
    );
    res.json(favorites.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/favorites/:user/:id", async (req, res) => {
  //user references the user id not the username

  try {
    const { id, user } = req.params;
    const newFavorite = await pool.query(
      "INSERT INTO favorites (user_ref, outlier_ref) VALUES ($1,$2)",
      [user, id]
    );

    res.status(200).json(newFavorite);
  } catch (error) {
    res.status(500).json(error.response);
  }
});

router.delete("/favorites/:user/:id", async (req, res) => {
  try {
    const { id, user } = req.params;
    const deletedFavorite = await pool.query(
      "DELETE FROM favorites WHERE outlier_ref=$1 AND user_ref=$2",
      [id, user]
    );

    res.json(deletedFavorite);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
