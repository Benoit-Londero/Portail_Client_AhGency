import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './AdminForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from "react-router-dom";

import * as MdIcons from "react-icons/md";


export default function AdminForm() {

    const [usersInfos, setUsersInfos] = useState([]);
    const [projetInfos, setProjetInfos] = useState([]);
    const [projetFiltered, setProjetFiltered] = useState([]);

    //const navigate = useNavigate();

    useEffect (() => {

      fetch('/api/getAllClient')
        .then(res => res.json())
        .then(json => setUsersInfos(json))
        .catch(err => console.info(err))

      fetch('/api/getAllProjet')
      .then(res => res.json())
      .then(json => setProjetInfos(json))
      .catch(err => console.info(err))
    }, [])
            
    console.log(usersInfos);
    console.log(projetFiltered);
    console.log(projetInfos);

    const handleSubmitTS = evt =>  {
        evt.preventDefault();
        let TSForm = document.getElementById('timesheetForm');
        let TSFormData = new FormData(TSForm);

        const conJSON = buildJsonFormData(TSFormData);

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
        .then(fetch('s978qlou8k7k7cuiqije21kc25hixa5q@hook.eu1.make.com', {method: 'GET', }))
    }

    const handleSelect = (e) => {
      let idU = parseInt(e.target.value);
      let idUFiltered = usersInfos.filter(donnee => donnee.ID === idU);
      let idE = idUFiltered[0].ID_entreprise;
      let projetFiltered = projetInfos.filter(data => data.ID_entreprise === parseInt(idE));
      setProjetFiltered(projetFiltered);
      console.log(projetFiltered);
    }

  return (      

    <div id='adminForm'>
        <NavBar />

        <h1>Encoder une tâche</h1>
      
{/*         <form id="timesheetForm" onSubmit={handleSubmitTS}>
          <table>
            <thead>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <label for="title">Titre de la tache <span className="required">*</span></label><br>
                  </br><input type="text" placeholder="Entrez le titre de la tâche" id="title" name="title" required/>
                </td>
              </tr>
              
              <tr>
                <td colspan="2">
                  <label for="tache">Ajouter une description <span className="required">*</span></label><br>
                  </br><textarea id="tache" name="tache" placeholder="tâche" required></textarea>
                </td>
              </tr>
              <tr>
                <td><label for="durée_tache"><MdIcons.MdOutlineMoreTime /> Durée (en min.)<span className="required">*</span></label><br>
                </br><input type="number" placeholder="25" id="duree_tache" name="duree_tache" required/></td>
                <td><label for="date_tache">Date d'éxecution<span className="required">*</span></label><br>
                </br><input type="date" placeholder="Date" id='date_tache' name="date_tache" required/>
                </td>
              </tr>
              <tr>
                  <td colspan="2"><label for="who_do_it">Assignée à<span className="required">*</span></label><br></br>
                    <select id='who_do_it' name="who_do_it" required>
                      <option id="disabled"> Sélectionnez un consultant </option>
                      <option value="Fabian Hernandez Barco">Fabian Hernandez Barco</option>
                      <option value="Quentin De Jarnac">Quentin De Jarnac</option>
                      <option value="Benoit Londero">Benoit Londero</option>
                    </select>
                  </td></tr>
                  <tr>
                  <td colspan="2"><label for="for_who">Client<span className="required">*</span></label><br></br>
                    <select id='for_who' name="for_who" onChange={handleSelect} required>
                      <option id="disabled"> Sélectionnez un client </option>
                      {usersInfos.map((user, index) => 
                          <option key={index} value={user.ID}>{user.Login}</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><label for="projet">Projet<span className="required">*</span></label><br></br>
                    <select id='projet' name="projet" required>
                      <option id="disabled"> Sélectionnez un projet </option>
                      {projetFiltered.map((pro, index) => 
                          <option key={index} value={pro.ID}>{pro.Tickets}</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr className="row_submit">
                  <td colspan="">
                    <input type="reset" id="reset"/>
                  </td>
                  <td>
                    <input type="submit" className="btn btn_primary" value="Enregistrer"/>
                    </td>
                  </tr>
            </tbody>
          </table>
        </form> */}

        <form id="timesheetForm" onSubmit={handleSubmitTS}>
          <table>
            <thead>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <label for="title">Titre de la tache <span className="required">*</span>
                  <input type="text" placeholder="Entrez le titre de la tâche" id="title" name="title" required/></label>
                </td>
              </tr>
              
              <tr>
                <td colspan="2">
                  <label for="tache">Ajouter une description <span className="required">*</span></label><br>
                  </br><textarea id="tache" name="tache" placeholder="tâche" required></textarea>
                </td>
              </tr>
              <tr>
                <td><label for="durée_tache"><MdIcons.MdOutlineMoreTime /> Durée (en min.)<span className="required">*</span></label><br>
                </br><input type="number" placeholder="25" id="duree_tache" name="duree_tache" required/></td>
                <td><label for="date_tache">Date d'éxecution<span className="required">*</span></label><br>
                </br><input type="date" placeholder="Date" id='date_tache' name="date_tache" required/>
                </td>
              </tr>
              <tr>
                  <td colspan="2"><label for="who_do_it">Assignée à<span className="required">*</span>
                    <select id='who_do_it' name="who_do_it" required>
                      <option id="disabled"> Sélectionnez un consultant </option>
                      <option value="Fabian Hernandez Barco">Fabian Hernandez Barco</option>
                      <option value="Quentin De Jarnac">Quentin De Jarnac</option>
                      <option value="Benoit Londero">Benoit Londero</option>
                    </select>
                    </label>
                  </td></tr>
                  <tr>
                  <td colspan="2"><label for="for_who">Client<span className="required">*</span>
                    <select id='for_who' name="for_who" onChange={handleSelect} required>
                      <option id="disabled"> Sélectionnez un client </option>
                      {usersInfos.map((user, index) => 
                          <option key={index} value={user.ID}>{user.Login}</option>
                      )}
                    </select>
                    </label>
                  </td>
                </tr>
                <tr>
                  <td colspan="2"><label for="projet">Projet<span className="required">*</span></label><br></br>
                    <select id='projet' name="projet" required>
                      <option id="disabled"> Sélectionnez un projet </option>
                      {projetFiltered.map((pro, index) => 
                          <option key={index} value={pro.ID}>{pro.Tickets}</option>
                      )}
                    </select>
                  </td>
                </tr>
                <tr className="row_submit">
                  <td colspan="">
                    <input type="reset" id="reset"/>
                  </td>
                  <td>
                    <input type="submit" className="btn btn_primary" value="Enregistrer"/>
                    </td>
                  </tr>
            </tbody>
          </table>
        </form>
    </div>
    
)}
