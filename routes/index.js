const express = require('express');
const router  = express.Router();

const User = require('../models/User')
const Company = require('../models/Company')
const Criteria = require('../models/Criteria')

/* GET All StartUps */
router.post('/', (req, res, next) => {
    User.findById({_id: req.body.id})
    .populate("companies")
    .then(user => {
        res.status(200).json(user.companies)
    })
 
});

module.exports = router;
