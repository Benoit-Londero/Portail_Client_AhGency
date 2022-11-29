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

        let entreprise = {
            nomEnt: context.req.body.nomEnt,
            TVA: context.req.body.tvaNumber,
            emailEnt: context.req.body.emailEnt,
            telEnt: context.req.body.telEnt,
            adresseEnt: context.req.body.adresseEnt,
            siteEnt: context.req.body.siteEnt,
            maintenance: context.req.body.maintenance,
            dateCreationEnt: context.req.body.dateCreationEnt
        }

        let sql = "INSERT INTO users(Login,Nom,Prenom,Password,Email,Role,Date_creation) VALUES (?,?,?,?,?,?,?)";
        let checkMail = "SELECT Email FROM users where Email = ?";
        let checkTVA = "SELECT TVA FROM entreprise WHERE TVA = ?";
        let sqlEnt = "INSERT INTO entreprise(Nom_societe,TVA,Adresse,Telephone,Email,Date_creation,Maintenance,Site_web) VALUES (?,?,?,?,?,?,?,?)";
        let updateEnt = "UPDATE users SET ID_entreprise = ? WHERE Email = ?";
        let getIDEnt = "SELECT ID_entreprise FROM entreprise WHERE TVA = ?";

        con.query(checkMail, [insc.mail], function (err, resultat) {
            if (err) throw err;
            if (resultat.length !==0) {
                response  =  JSON.stringify('Error');
                resolve(response);
            } else {
                con.query(checkTVA, [entreprise.TVA], function (err, results) {
                    if (err) throw err;
                    if (results.length !== 0) {
                        response = JSON.stringify('ErrorTVA');
                        resolve(response);
                    } else {
                        con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail,"Client",entreprise.dateCreationEnt], function (err,result){
                            if (err) throw err;
                        });
                        con.query(sqlEnt, [entreprise.nomEnt,entreprise.TVA,entreprise.adresseEnt,entreprise.telEnt,entreprise.emailEnt,entreprise.dateCreationEnt,entreprise.maintenance,entreprise.siteEnt], function (err,resu){
                            if (err) throw err;
                            con.query(getIDEnt, [entreprise.TVA], function (err, key) {
                                if (err) throw err;
                                let IDENT = key[0].ID_entreprise;
                                console.log(IDENT);
                                con.query(updateEnt, [IDENT,insc.mail], function (err, clef) {
                                    if (err) throw err;
                                    response  =  JSON.stringify('Success');
                                    resolve(response);
                                });
                            });
                        });
                    }
                })
            }
        })
    })

    context.res = {
        status: 200,
        body : response
    };
  
};
