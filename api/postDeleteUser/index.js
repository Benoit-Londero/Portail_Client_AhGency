const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context,req,res) {
    context.log('Javascript HTTP trigger function processed a request.');

    let response;
    response = await new Promise((resolve,reject) => {
        let del = {
            ID: context.req.body.ID,
        }

        let sql = "DELETE FROM users WHERE ID = ?";
        con.query(sql, [del.ID], function (err, resultat) {
            if (err) throw err;
        
            response  =  JSON.stringify('Le client a été supprimé');
            resolve(response);
        });
    })

    context.res = {
        status: 200,
        body : response
    };
  
};
