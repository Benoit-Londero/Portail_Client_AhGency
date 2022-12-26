const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let informations;

    informations = await new Promise((resolve,reject) => {

        let IDU = req.body.currentIDUser;

        let query = "SELECT * FROM users WHERE ID = ?";
        req = con.query(query, [IDU], function (err,rows){
            if (err) throw err;
            console.log(rows[0]);
            informations = rows[0];
            resolve(informations)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(informations)
    }   
}