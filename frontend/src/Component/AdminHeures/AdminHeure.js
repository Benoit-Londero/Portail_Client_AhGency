import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './AdminHeure.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHeure() {
    const [usersInfos, setUsersInfos] = useState([]);

    useEffect (() => {

      fetch('/api/getUser')
        .then(res => res.json())
        .then(json => setUsersInfos(json))
        .catch(err => console.info(err))
    }, [])

    const handleSubmitHeure = evt => {
        evt.preventDefault();

        let HForm = document.getElementById('HeureForm');
        let HFormData = new FormData(HForm);

        const conJSON = buildJsonFormData(HFormData);

        console.log(HFormData);

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(HFormData){
          const jsonFormData = {};
          for(const pair of HFormData){
              jsonFormData[pair[0]] = pair[1];
          }

          return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }

        console.log(conJSON);

        fetch('/api/postHours', {
          method: 'POST', 
          body: JSON.stringify(conJSON)
        })
        .then(res => res.json())
        .catch(err => console.info(err))
        .then(alert('Données enregistrées'))
    }

  return (      
    <div id='hourForm'>
        <NavBar />
        <h1>Créer une nouvelle entrée</h1>
      
        <form id="HeureForm" onSubmit={handleSubmitHeure}>
          <table>
            <tbody>
              <tr>
                <td><label for="for_who">Client<span className="required">*</span></label><br></br>
                  <select id='for_who' name="for_who" required>
                    <option default disabled> Sélectionnez un client </option>
                    {/* {Array.isArray(usersInfos) 
                          ? usersInfos.map((user, index) => <option key={index} value={user.ID}>{user.Login}</option>)
                          : []
                    } */}
                    {usersInfos.map((user, index) => 
                        <option key={index} value={user.ID}>{user.Login}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr><td><label for="heure_achete">Nombre d'heures achetées<span className="required">*</span></label><br></br><input type="number" placeholder="heure_achete" id='heure_achete' name="heure_achete" required/></td></tr>
              <tr><td><label for="date_Achat">Date d'achat<span className="required">*</span></label><br></br><input type="date" placeholder="Date" id='date_Achat' name="date_Achat" required/></td></tr>
              <tr><td><input type="submit" value="Ajouter"/></td></tr>
            </tbody>
          </table>
        </form>
    </div>
)}
