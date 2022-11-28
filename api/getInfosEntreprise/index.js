const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let informations;

    informations = await new Promise((resolve,reject) => {

        let IDE = req.body.currentIDEntreprise;


        let query = "SELECT * FROM entreprise WHERE ID_entreprise = ?";
        req = con.query(query, [IDE], function (err,rows){
            if (err) throw err;

            informations = rows[0];
            resolve(informations)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(informations)
    }   
}