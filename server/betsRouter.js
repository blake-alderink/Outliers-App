const express = require('express');
const pool = require('./db');
const cors = require('cors');


const router = express.Router();

router.use(express.json());
router.use(cors());


router.get('/', (req, res) => {
    res.json('this endpoint is working')
})


//returns all unique values of bets, in order to then loop through these values to find the outliers of each bet
router.get('/unique', async (req, res) => {
    const uniqueBets = await pool.query('select distinct uniquestring from bets');
    console.log(uniqueBets)
    res.json(uniqueBets.rows)
})

router.get('/unique/:uniquestring', async (req, res) => {
    const { uniquestring } = req.params;

    const bets = await pool.query('SELECT * FROM bets WHERE uniquestring = $1', [uniquestring])
    if (bets.rows.length === 0) {
        res.json('no bets with this value')
    } else {
        res.json(bets.rows)
    }
   

})

router.post('/', async (req, res) => {

try {

    const bet = req.body;
    const newBet = await pool.query('INSERT INTO bets (bet_type, betting_line, team, opponent, bookmaker, uniquestring, points_amount) VALUES($1,$2,$3,$4,$5,$6,$7)', [bet.bet_type, bet.betting_line, bet.team, bet.opponent, bet.bookmaker, bet.uniquestring, bet.points_amount])
    res.json(newBet.rows)
    
} catch (error) {
    console.log(error.message)
}

})

// CREATE TABLE bets(
//     bet_id SERIAL PRIMARY KEY,
//     bet_type VARCHAR(255),
//     betting_line SMALLINT,
//     team VARCHAR(255),
//     opponent VARCHAR(255),
//     bet_date VARCHAR(255),
//     bookmaker VARCHAR(255),
//     uniquestring VARCHAR(255),
//     points_amount SMALLINT
//     );


module.exports = router;