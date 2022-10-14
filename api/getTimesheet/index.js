// hello/index.js
const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let timesheet;

  timesheet = await new Promise((resolve,reject) => {
      
      let sql = "SELECT * FROM timesheet WHERE ID_Client = ?";
      let currentUser = req.body.currentIDUser;

      con.query(sql,[currentUser],function(err,result){
        if (err) throw err;
        console.log(result);

        const timesheet = [];

        for (i = 0; i < result.length; i++) {
          timesheet.push(result[i]);
        }
        resolve(timesheet);
      });
  });

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(timesheet)
  }
};