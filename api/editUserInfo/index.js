const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context,req,res) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let response;
  response = await new Promise((resolve,reject) => {
    
    let mail = req.body.email;
    let nom = req.body.nom;
    let pnom = req.body.prenom;
    let idu = req.body.idu;

    let check = req.body.pass;
    console.log(check);

    if(check !== ""){
      let pass = bcrypt.hashSync(req.body.pass,10,function(err,hash){});

      let sql = "UPDATE users SET Nom = ?, Prenom = ?, Email = ?, Password = ? WHERE ID = ?";

      //Insert dans la DB
      con.query(sql, [nom, pnom, mail, pass, idu], function (err,result){
          if (err) throw err;
          
          response = result;
          resolve(response)
      })
    } else {
      let sql2 = "UPDATE users SET Nom = ?, Prenom = ?, Email = ? WHERE ID = ?";

      //Insert dans la DB
      con.query(sql2, [nom, pnom, mail, idu], function (err,result){
          if (err) throw err;
          
          response = result;
          resolve(response)
      })
    }
  })

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: response
  }
}
