const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
    try {

      con.connect(
        function (err){
          if(err){
            console.log("!!! Cannot connect !!! Error:")
            throw err;
          }
          else {
            console.log("connection established.");
            getUser();
          }
        }
      )

      function getUser(){
        con.query('SELECT ID, Login FROM users', function (err,result){
          if (err) throw err;
          console.log(result);
        });
      }

      context.res = {
        status: 200,
        body : `Request succeed`
      };

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };