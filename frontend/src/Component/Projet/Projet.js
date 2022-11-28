import React, {useState} from 'react';
import NavBar from "../NavBar/NavBar";
import './Projet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Projet() {

    const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));
    const currentIDU = localStorage.getItem("currentIDU");

    const [message, setMessage] = useState(false);

    const handleDemande = async e => {
        e.preventDefault();
        let demandeForm = document.getElementById('DemandeForm'); //on récupère l'élement <form> et ces différents <input>
        let ticket = new FormData(demandeForm); //que l'on intègre à un formData

        const ticketJSON = buildJsonFormData(ticket);

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(ticket){
                const jsonFormData = {};
                for(const pair of ticket){
                    jsonFormData[pair[0]] = pair[1];
                }

                return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }

        const response = await fetch('/api/postTicket', { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(ticketJSON)
        })

        const data = await response.json();
        if(data === "Demande OK"){
            console.log(data);
            setMessage(true);
        }
    }

    const handleRetour = () => {
        setMessage(false);
    }

  return (
    <div id='adminForm'>
        <NavBar />

        <h1>Demande de support</h1>
      
        {message === false ? <form id="DemandeForm" onSubmit={handleDemande}>
          <table>
            <thead>
              <tr><td><h2>Enregistrez votre demande</h2></td></tr>
            </thead>
            <tbody>
                <tr><td><label for="title">Quel est le sujet de votre demande <span className="required">*</span></label><br></br><input type="text" placeholder="titre" id="title" name="title" required/></td></tr>
                <tr><td><label for="tache">Détaillez votre demande <span className="required">*</span></label><br></br><textarea id="tache" name="tache" placeholder="tâche" required></textarea></td></tr>
                <tr><td><input id="email" name="email" value={currentMAIL} hidden></input></td></tr>
                <tr><td><input id="iduser" name="iduser" value={currentIDU} hidden></input></td></tr>
                <tr><td><input id="dateEnvoi" name="dateEnvoi" value={new Date().toJSON().slice(0, 10)} hidden></input></td></tr>
                <tr>
                    <fieldset>
                        <legend>Avez vous un contrat de maintenance chez AhGency ?</legend>

                        <div>
                        <input type="radio" id="contratOK" name="contrat" value="oui" />
                        <label for="contratOK">Oui</label>
                        </div>

                        <div>
                        <input type="radio" id="contratNOK" name="contrat" value="non" checked/>
                        <label for="contratNOK">Non</label>
                        </div>
                    </fieldset>
                </tr>
                <tr><td><label for="siteURL">Veuillez enter l'URL de votre site web <span className="required">*</span></label><br></br><input type="text" placeholder="(exemple : www.google.be, https://www.ahgency.be, ....)" id="siteURL" name="siteURL"/></td></tr>
                <tr className="row_submit">
                    <td>
                        <input type="submit" value="Enregistrer"/>
                    </td>
                </tr>
            </tbody>
          </table>
        </form> : <button onClick={handleRetour}>Revenir au formulaire</button>}
    </div>
  )
}
