const mysql = require('mysql2');
const {con} = require('../db/db.js');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

module.exports = async function (context, req, res) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const generatePassword = (
        length = 20,
        wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
      ) => 
        Array.from(crypto.randomFillSync(new Uint32Array(length)))
          .map((x) => wishlist[x % wishlist.length])
          .join('')

    let mail = req.body.email;
    let randomstring = generatePassword();
    console.log(randomstring);
    let rdmPwdHashSalt = bcrypt.hashSync(randomstring,10,function(err,hash){})
    let sqlQUERY = "UPDATE users SET Password = ? WHERE Email = ?";

    con.query(sqlQUERY, [rdmPwdHashSalt, mail], function (err,result){
        if (err) throw err;
        resolve(randomstring);
    });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify(randomstring)
    };
}