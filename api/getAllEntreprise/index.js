const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let informations;

    informations = await new Promise((resolve,reject) => {

        let query = "SELECT * FROM entreprise";
        req = con.query(query, function (err,rows){
            if (err) throw err;

            informations = rows;
            resolve(informations)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(informations)
    }   
}