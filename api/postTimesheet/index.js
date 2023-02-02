const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('Javascript HTTP trigger function processed a request.');

  let addTimesheet;

  addTimesheet = await new Promise((resolve,reject) => {

  let time = req.body.duree_tache;
  let developpeur = req.body.who_do_it;
  let date = req.body.date_tache;
  let tache = req.body.tache;
  let client = req.body.for_who;
  let titre = req.body.title;
  let projet = req.body.projet;
  let idDev = req.body.id_Agent;
      
  let querySQL = "INSERT INTO timesheet(ID_Client,ID_Projet,Agent,Temps_Min_Tache,Titre,Informations,Date_Tache_Effectuee) VALUES (?,?,?,?,?,?,?)";
      
  let querySQL2 = "UPDATE users SET Minutes_Restantes = Minutes_Restantes - ? WHERE ID = ?";

  let querySQL3 = "SELECT ID_TS FROM timesheet WHERE ID_Client = ? AND ID_Projet = ? AND Agent = ? AND Titre = ? AND Informations = ? AND Temps_Min_Tache = ?"

  let querySQL4 = "INSERT INTO logs_entree_timesheet(ID_Tache,Temps,ID_Admin,Détails,Date_entree) VALUES (?,?,?,?,?)";

  con.query(querySQL, [client,projet,developpeur,time,titre,tache,date], function (err,result){
    if (err) throw err;
    console.log('Tache ajoutée')

    con.query(querySQL3, [client,projet,developpeur,titre,tache,time], function (err, restl){
      if(err){
        reject(err);
        console.log(err);
      }
      else {
        console.log(restl);
        console.log(restl[0].ID_TS);
        console.log(idDev);
        console.log(req.body.id_Agent);
        con.query(querySQL4, [restl[0].ID_TS,time,idDev,tache,date], function(err, resp) {
          if(err){
            reject(err);
          }
        })
      }
    })
  })


  con.query(querySQL2, [time, client], function (err, resultat) {
    if (err) throw err;

    addTimesheet = 'Timesheet enregistrée sans soucis';  
    resolve(addTimesheet);
  })
  })
    
  context.res = {
    status: 200,
    body : addTimesheet
  };

};