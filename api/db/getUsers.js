const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context) {
     let users;
     let query = "SELECT * FROM users WHERE Email = '" + mail + "'";

     value =  await con.query(query, (rows) => {
          users = rows;
     })

  try {
     context.res = {
          body:users
     }
    return users;
  }
  catch(err) {
    context.log.error('ERROR', err);
    throw err;
  }
};