const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let projet;

  projet = await new Promise((resolve,reject) => {
      
      let sql = "SELECT * FROM tickets WHERE ID_entreprise = ?";
      let currentEnt = req.body.currentIDEnt;

      con.query(sql,[currentEnt],function(err,result){
        if (err) throw err;
        console.log(result);

        const projet = [];

        for (i = 0; i < result.length; i++) {
          projet.push(result[i]);
        }
        resolve(projet);
      });
  });

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(projet)
  }
};