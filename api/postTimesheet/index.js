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
      
  let querySQL = "INSERT INTO timesheet(ID_Client,Agent,Temps_Min_Tache,Titre,Informations,Date_Tache_Effectuee) VALUES (?,?,?,?,?,?)";
      
  let querySQL2 = "UPDATE users SET Minutes_Restantes = Minutes_Restantes - ? WHERE ID = ?";

  con.query(querySQL, [client,developpeur,time,titre,tache,date], function (err,result){
    if (err) throw err;

    console.log('Tache ajoutée')
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