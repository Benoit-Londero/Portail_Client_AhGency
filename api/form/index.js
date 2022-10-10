const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
      con.connect(
        function (err){
          if(err){
            console.log("!!! Cannot connect !!! Error:")
            throw err;
          }
          else {

            console.log("connection established.");
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
                          }
                          else {
                              con.query(sql,function (err, rlt) {
                                  if (err) throw err;
                                  const lareponse = rlt
                                        ? "Reponse : " + JSON.stringify(rlt[0]) 
                                        : "Erreur dans la reception des données";

                                  console.log('Vous êtes connecté'); 
                                  console.log(lareponse);

                                  context.res = {
                                    Headers: {"Content-Type": "application/json"},
                                    body: lareponse
                                }
                              });
                          }
                      })
                  })
              }
              else {
                  context.res = {
                    status: 401,
                    body : 'mauvais mail'
                  };
              }
            })
          }
        }

    )

  context.res = {
    body : 'Yeah'
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