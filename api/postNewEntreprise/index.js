const mysql = require('mysql2');
const fs = require('fs');
const {con} = require('../db/db.js');

module.exports = async function (context,req,res) {
    context.log('Javascript HTTP trigger function processed a request.');

    let response;

    response = await new Promise((resolve,reject) => {
        let insc = {
            nom_societe: context.req.body.nomsoc,
            responsable: context.req.body.resp,
            tva: context.req.body.tva,
            adress: context.req.body.address,
            ville: context.req.body.ville,
            cp: context.req.body.cp,
            pays: context.req.body.country,
            tel: context.req.body.phone,
            site: context.req.body.site,
            mail: context.req.body.email,
            maintenance: context.req.body.maintenance,
            face: context.req.body.fb,
            insta: context.req.body.ig,
            linke: context.req.body.lkdin,
            pinte: context.req.body.pint,
        }

        let Date_creation = new Date();

        let sql = "INSERT INTO entreprise(Nom_societe,Responsable,TVA,Adresse,Ville,Code_Postal,Pays,Telephone,Site_web,Email,Maintenance,Facebook,Instagram,Linkedin,Pinterest,Date_creation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        con.query(sql, [insc.nom_societe,insc.responsable,insc.tva,insc.adress,insc.ville,insc.cp,insc.pays,insc.tel,insc.site,insc.mail,insc.maintenance,insc.face,insc.insta,insc.linke,insc.pinte,Date_creation], function (err, resultat) {
            if (err) throw err;
        
            response  =  JSON.stringify('Entreprise créé');
            resolve(response);
        });
    })

    context.res = {
        status: 200,
        body : response
    };
  
};
