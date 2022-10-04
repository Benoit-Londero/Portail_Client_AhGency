const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const {con} = require('../db.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.get('/api/getUser', async (req, res, next) => {
    let sqlQuery = "SELECT ID, Login FROM users";

    con.query(sqlQuery, function(err,result){
        if(err) throw err;
        res.json(result);
    })
});

module.exports = router;