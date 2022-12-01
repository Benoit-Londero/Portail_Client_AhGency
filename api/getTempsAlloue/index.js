const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let allocation;

    allocation = await new Promise((resolve,reject) => {

        let entreprise = req.body.currentIDEntreprise;
        let query = "SELECT SUM(AllocationTemps) as minutesAllouees FROM tickets WHERE ID_entreprise = ?";

        req = con.query(query, [entreprise], function (err,rows){
            if (err) throw err;

            allocation = rows;
            resolve(allocation)
        })
    })

    context.res = {
        status : 200,
        body : allocation
    }   
}