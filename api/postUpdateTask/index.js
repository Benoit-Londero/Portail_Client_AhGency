const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {
  context.log('Javascript HTTP trigger function processed a request.');

  let updateTask;
  let insertLog;

  updateTask = await new Promise((resolve,reject) => {

    let time = req.body.timeSpend;
    let statut = req.body.state;
    let descr = req.body.descr_;
    let idTask = req.body.id_task;
    let idUser = req.body.idUser;
        
    let querySQL = "UPDATE timesheet SET Temps_Min_Tache = Temps_Min_Tache + ?,Statut = ? WHERE ID_TS = ?";

    con.query(querySQL, [time,statut,idTask], function (err,result){
        if (err) throw err;

        console.log('Tache ajoutée')
        
        updateTask = 'Timesheet mis à jour';  
        resolve(updateTask);
    })
  })

  insertLog = await new Promise((resolve, reject) => {
    let querySQL2 = "INSERT INTO Logs_entree_timesheet(ID_Tache,Temps,ID_Admin,Détails) VALUES(?,?,?,?)";

    con.query(querySQL2, [idTask,time,idUser, descr], function(err,result){
      if (err) throw err;
      console.log('Log ajouté avec succes');

      insertLog = 'Log ajouté avec succes'
      resolve(insertLog) 
    })
  })
    
    
  context.res = {
    status: 200,
    body : updateTask + insertLog
  };

};