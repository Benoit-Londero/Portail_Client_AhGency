// hello/index.js
const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
    try {

      const timesheet = [];

      con.connect(
        function (err){
          if(err){
            console.log("!!! Cannot connect !!! Error:")
            throw err;
          }
          else {
            console.log("connection established.");
            readData();
          }
        }
      )

      function readData(){
        con.query('SELECT * from timesheet', function (err,results){
          if (err) throw err;
          console.log(results);

          for (i = 0; i < results.length; i++) {
            timesheet.push(results[i]);
          }
        });
      }

      context.res = {
        status: 200,
        body : JSON.stringify(results)
      };

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };