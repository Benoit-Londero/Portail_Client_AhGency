import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './Projet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FiIcons from "react-icons/fi";

import Row from 'react-bootstrap/Row';

export default function Projet() {

    const currentIDU = localStorage.getItem("currentIDU");
    const currentIDE = localStorage.getItem("currentIDE");

    const [currentMAIL, setCurrentMAIL] = useState();

    const [message, setMessage] = useState(false);

    useEffect (() => {

        let dataU = {currentIDUser: currentIDU};

        const onLoad = async () => {

            const response = await fetch('/api/getInfosClient', { 
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataU)
            })
        
            const data = await response.json();
            if(response.status === 200){
                setCurrentMAIL(data.Email);
            } else {
                alert('Erreur du serveur, veuillez réessayer plus tard');
            }
        }

        onLoad();
    }, [currentIDU])

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

    const handleProject = () => {
        console.log('i m alive');
    }

  return (
    <div id='adminForm'>
        <NavBar />

        <Row>
               <div className="project_sidebar">
                    <ul>
                         <li><button className="links_btn" onClick={handleProject} value="all"><FiIcons.FiZap/> Tous les projets</button></li>
                         <li><button className="links_btn" onClick={handleProject} value="archives"><FiIcons.FiArchive/> Archives</button></li>
                         <li><button className="links_btn" onClick={handleProject} value="mine"><FiIcons.FiPlus/> Créer un projet</button></li>
                    </ul>
               </div>
          </Row>

        <h1>Demande de support</h1>
      
        {message === false ? <form id="DemandeForm" onSubmit={handleDemande}>
          <table>
            <thead>
              <tr><td><h2>Enregistrez votre demande</h2></td></tr>
            </thead>
            <tbody>
                <tr><td><label for="title">Quel est le sujet de votre demande <span className="required">*</span></label><br></br><input type="text" placeholder="titre" id="title" name="title" required/></td></tr>
                <tr><td><label for="tache">Détaillez votre demande <span className="required">*</span></label><br></br><textarea id="tache" name="tache" placeholder="tâche" required></textarea></td></tr>
                <tr><td><label for="title">Allouer votre temps au projet <span className="required">*</span></label><br></br><input type="number" placeholder="en min" id="allocation" name="allocation" required/></td></tr>
                <tr><td><input id="email" name="email" value={currentMAIL} hidden></input></td></tr>
                <tr><td><input id="idEnt" name="idEnt" value={currentIDE} hidden></input></td></tr>
                <tr><td><input id="dateEnvoi" name="dateEnvoi" value={new Date().toJSON().slice(0, 10)} hidden></input></td></tr>
                <tr><td><label for="siteURL">Veuillez enter l'URL de votre site web <span className="required">*</span></label><br></br><input type="text" placeholder="(exemple : www.google.be, https://www.ahgency.be, ....)" id="siteURL" name="siteURL"/></td></tr>
                <tr className="row_submit">
                    <td>
                        <input type="submit" value="Enregistrer"/>
                    </td>
                </tr>
            </tbody>
          </table>
        </form> : <table><thead>Votre demande a bien été enregistrée, notre équipe reviendra vers vous dans les plus brefs délais</thead><tbody><button onClick={handleRetour}>Revenir au formulaire</button></tbody></table>}
    </div>
  )
}
