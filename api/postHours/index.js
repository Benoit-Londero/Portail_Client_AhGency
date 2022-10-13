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
            HeureFORM();
          }
        }
      )

     function HeureFORM(){
          
          let duree = req.body.heure_achete * 60;
          let client = req.body.for_who;
          let date_achat = req.body.date_Achat;

          let qSQL = "UPDATE users SET heures_restantes = heures_restantes + ?, heures_totales = heures_totales + ? WHERE ID = ?";
          let qSQL2 = "INSERT INTO achat(ID_Client,Date) VALUES (?,?)";

          conn.query(qSQL, [duree,duree,client], function (err,results){
               if (err) throw err;
               res.json(results);
          })

          conn.query(qSQL2, [client,date_achat], function (err,ress){
               if (err) throw err;
               return ress;
          })

          context.res = {
          status: 200,
          body : `Request succeed`
          };
     }

    } catch(error) {
      const err = JSON.stringify(error);
      context.res = {
        status: 500,
        body: `Request error. ${err}`
      };
    }
  };