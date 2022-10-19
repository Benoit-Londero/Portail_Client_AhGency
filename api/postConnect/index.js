const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context,res) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let response;
  response = await new Promise((resolve,reject) => {
    
    let mail = context.req.body.email;
    let pwd = context.req.body.pwd;

    let query = "SELECT * FROM users WHERE Email = '" + mail + "'";

    con.query(query, function (err, result) {
      if (err) throw err;

      if (result.length === 1){
        con.query(query, (err,rows) => {
          if (err) throw err;

          console.log('Connexion réussie');

          bcrypt.compare(pwd, rows[0].Password, (err, resp) => {
            if (err) throw err;
            if (!resp) {
              console.log('nul');
              reject('Le mot de passe est incorrect')
            }
            else {   
              console.log('Vous êtes connecté');
              console.log(JSON.stringify(rows[0]));
      
              response = rows[0] ? JSON.stringify(rows[0])
                           : 'Erreur dans la réception des données';
              resolve(response)
            }
          })
        })
      } else{
        reject('L\'email n\'existe pas dans notre base de donnée')
      }
    })
  })

  console.log(response);

  context.res = {
    status: 200,
    headers: {'Content-Type':'application/json'},
    body: response
  }
}