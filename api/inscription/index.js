const mysql = require('mysql');
const fs = require('fs');
const {conn} = require('../db/db.js');

module.exports = async function (context, req) {
    try {
        conn.connect(
            function (err){
            if(err){
                console.log("!!! Cannot connect !!! Error:")
                throw err;
            }
            else {
                console.log("connection established.");
                insertUser();
            }
            }
        )

        function insertUser(){

            let insc = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                pass: bcrypt.hashSync(req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
                mail: req.body.email,
                login: req.body.nom + req.body.prenom // Création du Login avec le nom & prenom
            }

            console.log(insc);

            let sql = "INSERT INTO users(Login,Nom,Prenom,Pass,email) VALUES (?,?,?,?,?)";
            con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
                if (err) throw err;
                //res.json(result);
            });

            console.log('yo');
        }

        context.res = {
            status: 200,
            body : `Request succeed`
        };  

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };