const fs = require('fs');
const mysql = require('mysql');

const con = new mysql.createConnection({
     host: process.env.AZURE_DATABASE_HOST,
     user: process.env.AZURE_DATABASE_USER,
     password: process.env.AZURE_DATABASE_PASS,
     database: process.env.AZURE_DATABASE_NAME,
     port: 3306,
     ssl: {ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
});
module.exports = {
     con
}