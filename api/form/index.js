const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');
const {users} = require('../db/getUsers');
const bcrypt = require("bcrypt");

module.exports = async function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let mail = context.req.body.email;
  let pwd = context.req.body.pwd;

  let respi;

  console.log(users)

  value = function(){
    let query = "SELECT * FROM users WHERE Email = '" + mail + "'";

    //respi = 4

    con.query(query, (rows) => {
      respi = rows;
    })
  }

  /* value = con.query(query, (err,rows) => {
    if (err) throw err

    respi = rows;
      
    bcrypt.compare(pwd, rows[0].Password, (err, resp) => {
      if (err) throw err;
      if (!resp) {
        console.log('nul');
      }
      else {   
        console.log('Vous êtes connecté');
        console.log(JSON.stringify(rows[0]));

        //return JSON.stringify(rows[0]);
        respi = JSON.stringify(rows[0]);
      }
    })
  }) 
 */
  try {
    await value();

    console.log(respi)
    
    context.res = {
      body: 'ha!' + respi
    }
  }
  catch(err) {
    context.log.error('ERROR', err);
    throw err;
  }
};