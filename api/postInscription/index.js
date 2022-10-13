const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');
const bcrypt = require("bcrypt");

module.exports = async function (context,req,res) {
    context.log('Javascript HTTP trigger function processed a request.');

    let inscription;

    inscription = await new Promise((resolve,reject) => {
        con.connect(function (err){
            if(err){
                console.log("!!! Cannot connect !!! Error:")
                throw err;
            }
            else {
                console.log("connection established.");
                insertUser(context);
            }
        })
    
    function insertUser(){
        let insc = {
            nom: context.req.body.nom,
            prenom: context.req.body.prenom,
            pass: bcrypt.hashSync(context.req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
            mail: context.req.body.email,
            login: context.req.body.nom + context.req.body.prenom // Création du Login avec le nom & prenom
        }

        let sql = "INSERT INTO users(Login,Nom,Prenom,Password,Email) VALUES (?,?,?,?,?)";
        con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
            if (err) throw err;
            
            inscription  = 'Request succeed : Merci ' + insc.prenom + ' pour votre inscription';
            resolve(inscription);
        });
    }
})

        context.res = {
            status: 200,
            body : inscription
        };
  
};
