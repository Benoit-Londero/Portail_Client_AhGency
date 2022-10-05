//const conn = process.env.DATABASE_CONNECTION_STRING;
const fs = require('fs');
const mysql = require('mysql');

var config = {
     host:"mysqcustomerportal.mysql.database.azure.com", 
     user:"ahgadmin", 
     password:"408pWoWHRQGtDTxu6697OrrCrhLle6", 
     database:'agc_portal_2', 
     port:3306, 
     ssl:{ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
   };

const conn = new mysql.createConnection(config);

module.exports = {
     conn
}