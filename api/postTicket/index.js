module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    /* let name = context.req.body.email;
    let date = context.req.body.date;
    let descr = context.req.body.descr;
    let title = context.req.body.demande;
    let cont_ma = context.req.body.contrat;

    let contrat;

    if(cont_ma === "oui"){
        contrat = "Vous avez un contrat de maintenance";
    
    } else {
        contrat = "Vous n'avez pas de contrat";
    }

    const responseMessage = name
        ? "Hello, " + name + ". We receive your new ticket :." + title + " " + descr + " le " + date + " " + contrat
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
 */

        let data = context.req.body.data.fields;
        
        const result = await new Promise((resolve,reject) => {
            
            /* data.forEach( key =>{
                array += key.value;

            }) */

        })


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: data
    };
}