import React from "react";


export default function AjoutClient(){

     const handleSubmit = async e => {
          e.preventDefault();

          let newClientForm = document.getElementById('clientForm');
          let adminInscr = new FormData(newClientForm);

          const jsonForm = buildJsonFormData(adminInscr);

          function buildJsonFormData(adminInscr){
            const jsonFormData = {};
            for(const pair of adminInscr){
                jsonFormData[pair[0]] = pair[1];
            }

            return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
          }

          const response = await fetch('api/postClientAdmin', {
               method: 'POST',
               body: JSON.stringify(newClient)
          })
          
          const ress = await response.json();
          console.log(ress);

     }

     return(
          <form onSubmit={handleSubmit}>
               <label>Nom<br/>
                    <input type="text" name="nom" placeholder="Doe" required/>
               </label><br/>
               
               <label>Prénom<br/>
                    <input type="text" name="prenom" placeholder="John" required/>
               </label><br/>
               
               <label>Email<br/>{error === true ? <span>Un compte existe déjà avec cette adresse email !</span> : null}
                    <input type="email" name="email" placeholder="johndoe@mail.be" required/>
               </label><br/>
                                          
               <label>Mot de passe<br/>
                    <input type="password" name="pass" placeholder="*********" required/>
               </label><br/>

               
               <h3>Les informations de l'entreprise</h3>
               
               <label>Nom de votre société<br/>
                    <input type="text" name="nomEnt" placeholder="Entreprise SPRL, SA Entreprise ...." required/>
               </label><br/>
                                          
               <label>Numéro de TVA<br/>{errorTVA === true ? <span>Ce numéro de TVA existe déjà ! Merci de nous contacter via l'adresse web@ahgency.be</span> : null}
                    <input type="text" name="tvaNumber" placeholder="BE 0123.456.789" required/>
               </label><br/>
                                          
               <label>Email de l'entreprise<br/>
                    <input type="email" name="emailEnt" placeholder="johndoe@mail.be" />
               </label><br/>
                                          
               <label>Numéro de téléphone<br/>
                    <input type="text" name="telEnt" placeholder="0470565656" />
               </label><br/>
                                          
               <label>Adresse du siège<br/>
                    <input type="text" name="adresseEnt" placeholder="Rue de Saint Andrée 54C, 1000 Bruxelles" />
               </label><br/>
                                          
               <label>URL de votre site web<br/>
                    <input type="text" name="siteEnt" placeholder="www.ahgency.be" />
               </label><br/>
                                          
               <label>Possédez vous déjà un contrat de maintenance chez nous ? <br/>
                    <select name="maintenance">
                         <option value = "0"> non </option>
                         <option value = "1"> oui </option>
                    </select>
               </label><br/>

               <input type="submit" name="inscription" value="M'inscrire" />
               <input type="hidden" name="objet" id="objet" value="inscription"></input>
               <input id="dateCreationEnt" name="dateCreationEnt" value={new Date().toJSON().slice(0, 10)} hidden></input>

          </form>
     )

}