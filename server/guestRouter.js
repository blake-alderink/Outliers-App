const express = require('express');
const cors = require('cors');


const router = express.Router();

router.use('/', (req, res, next) => {
    console.log('router is working! continue forward')
    next();
})

router.get('/', (req, res) => {
    res.json('this router is WORKING BABY')
})

router.use(express.json());
router.use(cors())




module.exports = router;