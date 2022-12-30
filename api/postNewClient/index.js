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
            mail: context.req.body.email,
            titre: context.req.body.fonction,
            entreprise: context.req.body.entreprise
        }
        let Date_creation = new Date();

        let sql = "INSERT INTO users(ID_entreprise,Login,Nom,Prenom,Password,Email,Role,Titre,Date_creation) VALUES (?,?,?,?,?,?,?,?,?)";

        con.query(sql, [insc.entreprise,insc.login,insc.nom,insc.prenom,insc.pass,insc.mail,"Client",insc.titre, Date_creation], function (err, resultat) {
            if (err) throw err;
        
            response  =  JSON.stringify('Client créé');
            resolve(response);
        });
    })

    context.res = {
        status: 200,
        body : response
    };
  
};
