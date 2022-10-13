const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

/* OLD 

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  try {
    con.connect(function (err){
      if(err){
        console.log("!!! Cannot connect !!! Error:")
        throw err;
      }
      else {
        console.log("connection established.");
        let lareponse = {};
        comparePass();
      }
    })

    function comparePass(){

      let mail = context.req.body.email;
      let pwd = context.req.body.pwd;
      
      let reqCheckID = "SELECT ID FROM users WHERE Email = '" + mail + "'";
      let reqPwd = "SELECT Password FROM users WHERE Email = '" + mail + "'";

      con.query(reqCheckID, function (err, result) {
        if (err) throw err;

        if (result.length === 1){
          con.query(reqPwd, function (err, resultat){

          if (err) throw err;
          let passRes = resultat[0].Password;
          let sql = "SELECT * FROM users WHERE Email = '" + mail + "' and Password = '" + passRes + "'";

          bcrypt.compare(pwd, passRes, (err, resp) => {
            if (err) throw err;
            if (!resp) {
              console.log('nul');
              return 'mauvais mot de passe';
            }
            else {
              con.query(sql,function (err, rlt) {
                if (err) throw err;
                lareponse = rlt
                  ? "Reponse : " + JSON.stringify(rlt[0])
                  : "Erreur dans la reception des données";
                  
                  console.log('Vous êtes connecté');
                  console.log(lareponse);

                  return lareponse;
                });
              }
            })
          })
        }
        else {
          return 'mauvais mail';
        }
      })
    }

    context.res = {
      body: lareponse
    }

    
  }
    catch(error) {
      const err = error;
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
};


*/

module.exports = async function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let ro;

  ro = await new Promise((resolve,reject) => {
    
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
              resolve('nul')
            }
            else {   
              console.log('Vous êtes connecté');
              console.log(JSON.stringify(rows[0]));
      
              ro = JSON.stringify(rows[0]);
              resolve(ro)
            }
          })
          
        })
      } else{
        resolve('L\'email n\'existe pas dans notre base de donnée')
      }
    })
  })

  context.res = {
    body: ro
  }

  console.log(ro); 
}