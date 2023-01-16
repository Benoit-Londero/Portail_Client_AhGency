const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let totHeure;

    totHeure = await new Promise((resolve,reject) => {

        let entreprise = req.body.currentIDEntreprise;
        let query = "SELECT SUM(Minutes_Achetees) as totachEntreprise, SUM(Minutes_Restantes) as restheEntreprise FROM users WHERE ID_entreprise = ?";

        req = con.query(query, [entreprise], function (err,rows){
            if (err) throw err;

            totHeure = rows;
            resolve(totHeure)
        })
    })

    context.res = {
        status : 200,
        body : totHeure
    }    
}