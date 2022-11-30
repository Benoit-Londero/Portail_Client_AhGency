const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let allHeure;

    allHeure = await new Promise((resolve,reject) => {

        let entreprise = req.body.currentIDEntreprise;
        let query = "SELECT SUM(Minutes_Restantes) FROM users WHERE ID_entreprise = ?";

        req = con.query(query, function (err,rows){
            if (err) throw err;

            allUsers = rows;
            resolve(allUsers)
        })
    })

    context.res = {
        status : 200,
        body : allUsers
    }   
}