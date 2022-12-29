const mysql = require('mysql');
const {con} = require('../db/db.js');

module.exports = async function (context, req) {

  let addMember;

  addMember = await new Promise((resolve,reject) => {
    
      let members = req.body.members; // ex: "1,3,5,6,7,8" -- Type = String
      let ID_Entreprise = req.body.id_entr; // id_entreprise

      let conv = req.body.members.split(','); // On split la string du JSON avec les différents ID en tableau

      let qSQL = "UPDATE entreprise SET Membres = ? WHERE ID_entreprise = ?"; //SQL pour Update la table ENTREPRISE
      let qSQL2 = "UPDATE users SET ID_Entreprise = ? WHERE ID IN (?)";  //SQL pour Update la table USER
  
      con.query(qSQL, [members,ID_Entreprise], function (err,results){
        if (err) throw err;

        console.log('Membres ajoutée')
        resolve('Les membres ont été ajoutés')
      })

      //Boucle pour update chaque utilisateur dont l'ID apparait dans la requête
      for(i=0;i<conv.length;i++){
        con.query(qSQL2, [ID_Entreprise, Number(conv[i])], function (err,results){
          if (err) throw err;
  
          console.log('Membres ajoutés')
          resolve('Les membres ont été ajoutés')
        })
        
      }
      
  })

  context.res = {
    status:200,
    body: addMember
  }
};


/* 
1 Recupere les différents ID 
2 Boucle pour chaque ID ou trouver une requete SQL ou le WHERE = un tableau 
*/