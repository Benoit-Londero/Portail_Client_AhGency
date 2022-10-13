// hello/index.js
const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let timesheet;

  timesheet = await new Promise((resolve,reject) => {
    con.connect(function (err) {
      if(err) throw err;
          
      console.log("connection established.");
      readData();
    })

    function readData(){
      con.query('SELECT * from timesheet', function (err,results){
        if (err) throw err;
        console.log(results);

        const timesheet = [];

        for (i = 0; i < results.length; i++) {
          timesheet.push(results[i]);
        }
        resolve(timesheet);
      });
    }
  });

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: timesheet
  }
};