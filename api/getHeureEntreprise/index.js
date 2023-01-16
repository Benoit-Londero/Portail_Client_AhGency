const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let allHeure;

    allHeure = await new Promise((resolve,reject) => {

        let entreprise = req.body.currentIDEntreprise;
        let query = "SELECT SUM(Minutes_Restantes) as minutesEntreprise FROM users WHERE ID_entreprise = ?";

        req = con.query(query, [entreprise], function (err,rows){
            if (err) throw err;

            allHeure = rows;
            resolve(allHeure)
        }) 
    })

    context.res = {
        status : 200,
        body : allHeure
    }   
}