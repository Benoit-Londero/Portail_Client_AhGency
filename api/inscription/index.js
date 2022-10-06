const mysql = require('mysql');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context,req,res) {
    context.log('Javascript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        console.log(context.req);
    try {
        con.connect(
            function (err){
                if(err){
                    console.log("!!! Cannot connect !!! Error:")
                    throw err;
                }
                else {
                    console.log("connection established.");
                    insertUser(req);
                }
            }
        )
    }
    catch(error){
        const err = JSON.stringify(error);
        context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
    
    function insertUser(){

            let insc = {
                nom: context.req.body.nom,
                prenom: context.req.body.prenom,
                pass: bcrypt.hashSync(context.req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
                mail: context.req.body.email,
                login: context.req.body.nom + context.req.body.prenom // Création du Login avec le nom & prenom
            }

            let sql = "INSERT INTO users(Login,Nom,Prenom,Pass,email) VALUES (?,?,?,?,?)";
            con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
                if (err) throw err;
                context.res= {
                    status: 200,
                    body: result
                };
            });
        }

        context.res = {
            status: 200,
            body : `Request succeed`
        };
      


  };