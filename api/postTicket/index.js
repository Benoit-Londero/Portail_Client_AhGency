const { con } = require("../db/db");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
      
    let result;
    
    result = await new Promise((resolve,reject) => {
        
        let email = context.req.body.email;
        let date = context.req.body.dateEnvoi;
        let idEnt = context.req.body.idEnt;
        let title = context.req.body.title;
        let detail = context.req.body.tache;
        let url = context.req.body.siteURL;
        let allocation = parseInt(context.req.body.allocation);
        let Status = "Non démarré";
        let deadline = context.req.body.deadline;

        let sqlTicket = "INSERT INTO tickets(Tickets,ID_entreprise,AllocationTemps,Date,Statut,Email,Description,URL,Deadline) VALUES (?,?,?,?,?,?,?,?)";

        con.query(sqlTicket, [title, idEnt, allocation, date, Status, email, detail, url, deadline], function (err, resultat) {
            if (err) throw err;
            result = JSON.stringify('Demande OK');
            resolve(result);
        });

    })


    context.res = {
        status: 200,
        body: result
    };
}