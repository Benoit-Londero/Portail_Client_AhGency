const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const { resolve } = require('path');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let projetAll = [];

  projetAll = await new Promise((resolve,reject) => {
    
    let sql = "SELECT * FROM tickets";

    con.query(sql,function(err,result){
      if (err) throw err;
      console.log(result);

      projetAll = result;
      resolve(projetAll);
    })
  })

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(projetAll)
  }
}