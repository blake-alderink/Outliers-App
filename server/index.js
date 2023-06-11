const express = require('express');
const guestRouter = require('./guestRouter');
const pool = require('./db');

const app = express();

app.use(express.json());
app.use('/guest', guestRouter)

app.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows)
    } catch (error) {
        console.error(error.message)
    }
      // res.json("if this is showing up, then this is showing you that this is working")
})

app.listen(8000, () => {
    console.log("app now listening on port 8000")
})

