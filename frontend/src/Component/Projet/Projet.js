import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

import AdminHeure from "../AdminHeures/AdminHeure";
import AdminForm from "../AdminForm/AdminForm";

import Button from 'react-bootstrap/Button';

import illu from '../../img/Brainstorming_session_Monochromatic.png';

import './Projet.css';

export default function Projet() {
    const currentIDU = localStorage.getItem("currentIDU");
    const currentIDE = localStorage.getItem("currentIDE");

    const [currentMAIL, setCurrentMAIL] = useState();
    const [message, setMessage] = useState(false);

    const [formHeures, setFormHeures] = useState(false);
    const [formTasks, setFormTasks] = useState(false);
    const [formProjet, setFormProjet] = useState(true);

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

    /** Ajout Benoit */

    const changeForm = (e) => {
        let value = e.target.value;

        console.log(value);

        if(value === 'projet'){
            setFormTasks(false);
            setFormHeures(false);
            setFormProjet(true);

        } else if(value === 'taches'){
            setFormTasks(true);
            setFormHeures(false);
            setFormProjet(false);

        } else if(value === 'heures'){
            setFormTasks(false);
            setFormHeures(true);
            setFormProjet(false);
        }
    }

  return (
    <div>
        <NavBar />
        <div className="project_sidebar"></div>

        <div id='adminForm' className="main__content">
            

            {message === false ? <form id="DemandeForm" onSubmit={handleDemande}>

            <h1>Informations sur la demande</h1>

            <div className="mobile">
                <ul>
                    <li><Button className="btn noborder" value="projet" onclick={changeForm}>Projet</Button></li>
                    <li><Button className="btn noborder" value="taches" onclick={changeForm}>Tâches</Button></li>
                    <li><Button className="btn noborder" value="heures" onclick={changeForm}>Credit</Button></li>
                </ul>
            </div>
                

            {formProjet === true ? 
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td colspan="2"><label for="title">Nom du projet <span className="required">*</span></label>
                            <input type="text" placeholder="Créer un projet..." id="title" name="title" required/></td>
                        </tr>
                        <tr>
                            <td colspan="2"><label for="tache">Expliquez votre demande <span className="required">*</span></label><br></br>
                            <textarea id="tache" name="tache" placeholder="tâche" required></textarea></td>
                        </tr>
                        <tr>
                            <td><label for="title">Combien de temps désirez-vous allouer à votre projet ?<span className="required">*</span></label></td>
                            <td>
                                <select id="allocation" name="allocation">
                                    <option value="0"> 0</option>
                                    <option value="60">1 heure</option>
                                    <option value="120">2 heures</option>
                                    <option value="180">3 heures</option>
                                    <option value="240">4 heures</option>
                                    <option value="300">5 heures</option>
                                    <option value="600">10 heures</option>
                                </select>
                            </td>
                        </tr>
                        <tr><td><input id="email" name="email" value={currentMAIL} hidden></input></td></tr>
                        <tr><td><input id="idEnt" name="idEnt" value={currentIDE} hidden></input></td></tr>
                        <tr><td><input id="dateEnvoi" name="dateEnvoi" value={new Date().toJSON().slice(0, 10)} hidden></input></td></tr>

                        <tr>
                            <td><label for="deadline">Pour quand doit-il être fini?</label></td>
                            <td><input type="date" name="deadline" id="deadline" required></input></td>
                        </tr>
                        <tr className="row_submit">
                            <td colspan="2"><input type="submit" value="Enregistrer"/></td>
                        </tr>
                    </tbody>
                </table> 
            :''}

            {formTasks === true ? <AdminForm />:''}

            {formHeures === true ? <AdminHeure />:''}

            </form> : <table><thead>Votre demande a bien été enregistrée, notre équipe reviendra vers vous dans les plus brefs délais</thead><tbody><button onClick={handleRetour}>Revenir au formulaire</button></tbody></table>}
        </div>

        <img className="illu_prjt" src={illu} alt='illustration'></img>
    </div>
  )
}
