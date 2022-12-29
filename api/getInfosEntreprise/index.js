const mysql = require('mysql2');
const {con} = require('../db/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let informations;

    informations = await new Promise((resolve,reject) => {

        let IDE = req.body.currentIDEntreprise;

/*         let query = "SELECT e.ID_entreprise, e.Nom_societe, e.TVA, e.Adresse, e.Telephone, e.Email, e.Date_creation, e.Maintenance, e.Site_web, e.Membres, u.ID, u.Nom, u.Prenom FROM entreprise as e JOIN users as u on e.ID_entreprise = u.ID_entreprise WHERE e.ID_entreprise = ?"; */
        let query = "SELECT * FROM entreprise WHERE ID_entreprise = ?"
        req = con.query(query, [IDE], function (err,rows){
            if (err) throw err;

            informations = rows;
            resolve(informations)
        })
    })

    context.res = {
        status : 200,
        body : JSON.stringify(informations)
    }   
}