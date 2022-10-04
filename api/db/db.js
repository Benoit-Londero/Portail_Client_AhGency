/* const mysql = require("mysql");

const connString = process.env.DATABASE_CONNECTION_STRING;
const con =mysql.createConnection(connString);      

module.exports = {
     con
} */
const mysql = require("mysql");
const fs = require('fs');

const con =mysql.createConnection(
     {
     host:"mysqcustomerportal.mysql.database.azure.com", 
     user:"ahgadmin", 
     password:"408pWoWHRQGtDTxu6697OrrCrhLle6", 
     database:"agc_portal_2", //custportaldb
     port:3306,
     ssl: {
          ca:fs.readFileSync('../DigiCertGlobalRootCA.crt.pem')
     }
});

module.exports = {
     con
}