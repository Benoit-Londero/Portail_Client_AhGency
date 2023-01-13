const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let logs;

    logs = await new Promise((resolve,reject) => {
        let query = "SELECT * FROM logs_entree_timesheet";
        req = con.query(query, function (err,rows){
            if (err) throw err;

            logs = rows;
            resolve(logs)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(logs)
    }   
}