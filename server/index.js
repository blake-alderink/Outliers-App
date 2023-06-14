const express = require('express');
const guestRouter = require('./guestRouter');
const userRouter = require('./userRouter')
const homeRouter = require('./homeRouter')
const betsRouter = require('./betsRouter')
const outliersRouter = require('./outliersRouter')
const pool = require('./db');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
app.use('/guest', guestRouter);
app.use('/users', userRouter);
app.use('/home', homeRouter);
app.use('/bets', betsRouter);
app.use('/outliers', outliersRouter)

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


//on load, you would get user that matches, and set the state of the user. and then you would run the axios.get for the favorites, that would get the favorites that are assoicated with that user. 

//how would you set this up... 

//endpoint should be /favorites/:id
//which gives you the favorites from the id which is derived from the userSlice
//if the guest endpoint didn't exist, (which it shouldn't),
//you could just have a user endpoint that had a favorites endpoint that didn't need a parameter.  
//don't actually need that... you just need a user endpoint.  and athen there can be a /favorites on it that will give yuo the favorites you need for that user. 
