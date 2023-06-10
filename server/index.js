const express = require('express');
const guestRouter = require('./guestRouter');

const app = express();

app.use(express.json());
app.use('/guest', guestRouter)

app.get('/', (req, res) => {
    res.json("if this is showing up, then this is showing you that this is working")
})

app.listen(8000, () => {
    console.log("app now listening on port 8000")
})

