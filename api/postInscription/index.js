const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context,req,res) {
    context.log('Javascript HTTP trigger function processed a request.');

    let response;

    response = await new Promise((resolve,reject) => {
        let insc = {
            nom: context.req.body.nom,
            prenom: context.req.body.prenom,
            pass: bcrypt.hashSync(context.req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
            login: context.req.body.nom + context.req.body.prenom, // Création du Login avec le nom & prenom
            mail: context.req.body.email
        }

        let sql = "INSERT INTO users(Login,Nom,Prenom,Password,Email) VALUES (?,?,?,?,?)";
        let checkMail = "SELECT Email FROM users where Email = ?";

        con.query(checkMail, [insc.mail], function (err, resultat) {
            if (err) throw err;
            if (resultat.length !==0) {
                response = 'Error';
                resolve(response);
            } else {
                con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
                    if (err) throw err;
                    response  = 'Success';
                    resolve(response);
                });
            }
        })
    })

    context.res = {
        status: 200,
        body : response
    };
  
};
