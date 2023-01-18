import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './AdminForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from "react-router-dom";

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";


export default function AdminForm() {

    const [usersInfos, setUsersInfos] = useState([]);
    const [projetInfos, setProjetInfos] = useState([]);
    const [projetFiltered, setProjetFiltered] = useState([]);

    const [nameProjet, setNameProjet] = useState();
    const [emailUser, setEmailUser] = useState();
    const [nameAgent, setNameUser] = useState();
  
    //const navigate = useNavigate();
    useEffect (() => {

      fetch('/api/getAllUsers')
        .then(res => res.json())
        .then(json => setUsersInfos(json))
        .catch(err => console.info(err))

      fetch('/api/getAllProjet')
        .then(res => res.json())
        .then(json => setProjetInfos(json))
        .catch(err => console.info(err))
    }, [])

    const handleSubmitTS = evt =>  {
        evt.preventDefault();
        let TSForm = document.getElementById('timesheetForm');
        let TSFormData = new FormData(TSForm);

        const conJSON = buildJsonFormData(TSFormData);
        conJSON.ticket = nameProjet[0]; // On rajoute à l'objet le nom du ticket/projet
        conJSON.EmailToNotif = emailUser[0]; // On rajoute à l'objet l'email de l'agent
        conJSON.for_who = nameAgent[0]; // On rajoute à l'objet le nom de l'agent

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(TSFormData){
          const jsonFormData = {};
          for(const pair of TSFormData){
              jsonFormData[pair[0]] = pair[1];
          }

          return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }

        fetch('/api/postTimesheet', {method: 'POST', body: JSON.stringify(conJSON)})
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.info(err))
        .then(alert('Données enregistrées'))
        
        fetch('https://hook.eu1.make.com/8avz3iho36j9mjcuuukd6ugucjwzavq7', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body : JSON.stringify(conJSON)
        })
    }

    const handleSelect = (e) => {
      let idU = parseInt(e.target.value);
      let idUFiltered = usersInfos.filter(donnee => donnee.ID === idU);
      
      let idE = idUFiltered[0].ID_entreprise;
      let projetFiltered = projetInfos.filter(data => data.ID_entreprise === parseInt(idE));
      

      setProjetFiltered(projetFiltered);
      
      console.log(projetFiltered);
      
    }

    const handleNameTicket = (e) => {
      let pid = parseInt(e.target.value);
      let nameprojet = projetInfos.filter(data => data.ID === pid).map((item,index) => {
        return( item.Tickets )
      })
      console.log(nameprojet)
      setNameProjet(nameprojet);
    }

    const handleEmailAgent = (e) => {
      let uid = parseInt(e.target.value);
      let email = usersInfos.filter(data => data.Login === uid).map((item,index) => {
        return ( item.Email)
      })

      setEmailUser(email);

      let name = usersInfos.filter(data => data.ID === uid).map((item,index) => {
        return (item.Prenom + ' ' + item.Nom)
      })

      setNameUser(name)
    }
  return (      

    <div>
        <NavBar />
        <div className="project_sidebar"></div>

      <div className="main__content">
        <h1>Encoder une tâche</h1>
          <form id="timesheetForm" onSubmit={handleSubmitTS}>
            <table>
              <tbody>
                <tr>
                  <td colspan="2">
                    <label for="title">Titre de la tache <span className="required">*</span>
                    <input type="text" placeholder="Entrez le titre de la tâche" id="title" name="title" required/></label>
                  </td>
                </tr>
                <tr>
                  <td><label for="durée_tache"><MdIcons.MdOutlineMoreTime /> Durée (en min.)<span className="required">*</span></label></td>
                  <td><input type="number" placeholder="25" id="duree_tache" name="duree_tache" required/></td>
                </tr>
                <tr>
                  <td><label for="date_tache"><BsIcons.BsCalendarCheck/> Date d'éxecution<span className="required">*</span></label></td>
                  <td><input type="date" placeholder="Date" id='date_tache' name="date_tache" required/></td>
                </tr>
                <tr>
                  <td><label for="who_do_it"><BsIcons.BsPerson/> Assignée à<span className="required">*</span></label></td>
                  <td>
                    <select id='who_do_it' name="who_do_it" onChange={handleEmailAgent} required>
                      <option id="disabled"> Sélectionnez un consultant </option>
                      {usersInfos.map((index,item) => {
                        return(
                          <option key={index} value={item.ID}>{item.Nom + ' ' + item.Prenom}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label for="for_who"> <BsIcons.BsFlag/> Client<span className="required">*</span></label></td>
                  <td>
                    <select id='for_who' name="the_Agent" onChange={handleSelect} required>
                      <option id="disabled"> Sélectionnez un client </option>
                      {usersInfos.filter(donnee => donnee.Role === 'Client').map((user, index) => 
                        <option key={index} value={user.ID}>{user.Prenom + ' ' + user.Nom}</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label for="projet"> <BsIcons.BsClipboardCheck/> Projet<span className="required">*</span></label></td>
                  <td>
                      <select id='projet' name="projet" required onChange={handleNameTicket}>
                          <option id="disabled"> Sélectionnez un projet </option>
                          {projetFiltered.map((pro, index) => 
                              <option key={index} value={pro.ID}>{pro.Tickets}</option>
                          )}
                      </select>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <label for="tache" id="Descr__label"><BsIcons.BsTextParagraph/>Ajouter une description <span className="required">*</span></label>
                    <textarea id="tache" name="tache" placeholder="tâche" required></textarea>
                  </td>
                </tr>
                <tr className="row_submit">
                  <td><input type="reset" id="reset"/></td>
                  <td><input type="submit" className="btn btn_primary" value="Enregistrer"/></td>
                </tr>
              </tbody>
            </table>
          </form>
      </div>
    </div>  
)}
