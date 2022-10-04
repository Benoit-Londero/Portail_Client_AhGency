const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const {con} = require('../../db/db.js');
const bcrypt = require("bcrypt");
const viewall = require("../../viewall/index.js");

module.exports = {

    getUser: function(context){
        try{
            let sqlQuery = "SELECT ID, Login FROM users";

            con.query(sqlQuery, function(err,result){
                if(err) throw err;
                context.res.json(result);
            })
        } catch (error) {
            context.res.status(500).send(error);
        }
    },

    viewall: function(context){
        try{
            let sql = "SELECT * FROM timesheet";

            con.query(sql,function(err,result){
                if (err) throw err;
                res.json(result);
            })
        } catch (error){
            context.res.status(500).send(error);
        }
    }
}