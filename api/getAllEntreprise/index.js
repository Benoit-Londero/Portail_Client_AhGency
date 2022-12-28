const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let entreprises;

    entreprises = await new Promise((resolve,reject) => {

        let query = "SELECT * FROM entreprise";
        req = con.query(query, function (err,rows){
            if (err) throw err;

            entreprises = rows;
            resolve(entreprises)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(entreprises)
    }   
}