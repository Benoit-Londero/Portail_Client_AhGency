const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let messages;

  messages = await new Promise((resolve,reject) => {
      
      let sql = "SELECT * FROM conversation WHERE ID_client = ?";
      let currentClt = req.body.currentIDU;

      con.query(sql,[currentClt],function(err,result){
        if (err) throw err;
        console.log(result);

        const messages = [];

        for (i = 0; i < result.length; i++) {
          messages.push(result[i]);
        }
        resolve(messages);
      });
  });

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(messages)
  }
};