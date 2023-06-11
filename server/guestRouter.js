const express = require('express');
const cors = require('cors');
const pool = require('./db');


const router = express.Router();
router.use(express.json());
router.use(cors())

router.use('/', (req, res, next) => {
    console.log('router is working! continue forward')
    next();
})

router.get('/', async (req, res) => {
try {
    
    const favorites = await pool.query('SELECT * FROM favorites JOIN bets ON favorites.bet_ref=bets.bet_id WHERE favorites.user_ref = $1', [1]);
    res.json(favorites.rows);
    console.log('successful database query');

} catch (error) {
    console.log(error.message);
}
    //get favorites where user_id is equal to "1"

    // res.json('this router is WORKING BABY')
})






module.exports = router;