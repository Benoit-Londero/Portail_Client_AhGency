import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";

/* import AjoutClient from '../AjoutClient/AjoutClient.js'; */
import Moment from "moment";

import Button from 'react-bootstrap/Button';
import * as MdIcons from "react-icons/md";

export default function Clients() {

     const [addClient, setAddClient] = useState(false); //Const pour afficher le formulaire d'ajout client
     const [addEntreprise, setAddEntreprise] = useState(false); //Const création d'entreprise
     const [showEntreprise, setShowEntreprise] = useState(false); // Navigation dans les onglets CLIENTS / ENTREPRISE

     const [showDetails, setShowDetails] = useState(false); //Affichage Modale Client
     const [showDetailsEntr, setShowDetailsEntreprise] = useState(false); //Affichage Modale Entreprise

     const [allUsers, setAllUsers] = useState([]);
     const [dataClient,setDataClient] = useState([]);

     const [allEntreprise, setAllEntreprise] = useState([]); //Affiche toutes les entreprises
     const [dataEntr, setDataEntr] = useState([]);

     const [selectMembers, setMembers] = useState([]); //Sélection des membres en fonction de l'ID_ENTR

     useEffect (() => {

          const listUser = async () => {
               const response = await fetch('/api/getAllUsers');

               const result = await response.json();
               if(response.status === 200){
                    setAllUsers(result)
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          listUser();

          const listEntrep = async () => {
               const response2 = await fetch('/api/getAllEntreprise');

               const res = await response2.json();
               if(response2.status === 200){
                    setAllEntreprise(res);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard')
               }
          }

          listEntrep();
     }, [])

     /* AJOUT BENOIT - DECEMBRE 2022 */

          const handleAddClient = (e) =>{
               setAddClient(true);
          }

          const handleAddEntreprise = (e) =>{
               setAddEntreprise(true);
          }

          const closeTasks = (e) => {
               setAddClient(false);
               setShowDetails(false);
               setShowDetailsEntreprise(false);
               setAddEntreprise(false);
          }

          /** Switch l'affichage entre l'onglet client & entreprise **/
          const handleEntreprise = (e) => {
               let onglet = e.target.value;
               if(onglet === "entreprise"){
                    setShowEntreprise(true)
               } else {
                    setShowEntreprise(false);
               }
               e.target.classList.toggle('active');
          }

          /** Function qui permet de récupérer les informations CLIENTS et de les définir pour la modale **/
          const handleShowClient = (e) => {
               let id_client = e.target.value;
               
               let jsonID = {currentIDUser: id_client};
               console.log(jsonID);

               fetch('/api/getInfosClient', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonID)
               })
               .then(res => res.json())
               .then(json => setDataClient(json))
               .then(json => console.log(json))
               .then(setShowDetails(true))
               .catch(err => console.info(err))
          }

          /** Function qui permet de récupérer les informations ENTREPRISE et de les définir pour la modale **/
          const handleShowEntreprise = (e) => {
               let id_entr = e.target.value;
               
               let jsonID = {currentIDEnt: id_entr};
               console.log(jsonID);

               fetch('/api/getInfosEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonID)
               })
               .then(res => res.json())
               .then(json => setDataEntr(json))  
               .then(setShowDetailsEntreprise(true))
               .catch(err => console.info(err))
          }

          /* Ajout membres à l'entreprise -- Création du tableau contenant les différents membres */
          const handleChange = (e) => {
               var options = e.target.options;
               var value = [];
               
               for (var i=0, l = options.length; i<l; i++) {
                    if (options[i].selected){
                         value.push(options[i].value);
                    }
               }
               setMembers({'members': value.toString()}); // Conversion en String
          }

          const handleMemberSubmit = async e => {
               e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
               
               let addMemberForm = document.getElementById('addMember'); //on récupère l'élement <form> et ces différents <input>
               let myMember = new FormData(addMemberForm); //que l'on intègre à un formData
       
               const jsonForm = buildJsonFormData(myMember)
       
               //On crée une boucle pour transformer le FormData en JSON
               function buildJsonFormData(myMember){
                   const jsonFormData = {};
                   for(const pair of myMember){
                       jsonFormData[pair[0]] = pair[1];
                   }
                   return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
               }

               const obj = JSON.stringify(Object.assign({}, jsonForm, selectMembers));

               const reception = await fetch('/api/postAddMember', { 
                   method: 'POST',
                   headers: {'Content-Type':'application/json'},
                   body: obj
               })

               console.log(reception);
               window.location.reload();
          }
          /************************/

          /* Ajout nouveau client */
          const handleSubmitClient = async e => {
               e.preventDefault();
               
               let newClient = document.getElementById('newClient');
               let myNewClient = new FormData(newClient);

               const jsonForm2 = buildJsonFormData(myNewClient);

               function buildJsonFormData(myNewClient){
                    const jsonFormData = {};
                    for(const pair of myNewClient){
                        jsonFormData[pair[0]] = pair[1];
                    }
                    return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
               }

               const reception = await fetch('/api/postNewClient',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonForm2)
               })

               console.log(reception);
               window.location.reload();
          }
          /************************/

          /* Ajout nouveau entreprise */
          const handleSubmitEntreprise = async e => {
               e.preventDefault();
               
               let newEntr = document.getElementById('newEntreprise');
               let myEntre = new FormData(newEntr);

               const jsonFormE = buildJsonFormData(myEntre);

               function buildJsonFormData(myEntre){
                    const jsonFormData = {};
                    for(const pair of myEntre){
                        jsonFormData[pair[0]] = pair[1];
                    }
                    return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
               }

               const reception = await fetch('/api/postNewEntreprise',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonFormE)
               })

               console.log(reception);
               window.location.reload();
          }
          /************************/

          /*** Supprimer client ***/
          const handleDeleteClient = async e => {
               e.preventDefault();
               
               let idDelete = e.target.value;
               let obj = {ID: idDelete}

               const reception = await fetch('/api/postDeleteUser',{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(obj)
               })

               console.log(reception);
               window.location.reload();
          }
          /************************/

          

     return (

     <div>
     <NavBar />
     
     <div className="project_sidebar">
          <h2>CRM</h2>

          <ul>
               <li><Button className='btn noborder' value="clients" onClick={handleEntreprise}>Clients</Button></li>
               <li><Button className='btn noborder' value="entreprise" onClick={handleEntreprise}>Entreprise</Button></li>
               <li></li>
               <li>
                    {showEntreprise === false ? <label className="bold">Ajouter un client
                    <Button className="btn primary_btn" onClick={handleAddClient}>+</Button></label>
                    :
                    <label>Ajouter une entreprise<br></br>
                    <Button className="btn primary_btn" onClick={handleAddEntreprise}>+</Button>
                    </label>}
               </li>
          </ul>
     </div>

     <Container id="page_CRM"  className="main__content">

          <Row>
               {showEntreprise === false ?
                    <Col className="tbl" id="TblClients">
                         <h2>Clients</h2>
                         <table>
                              <thead>
                                   <th><p>Nom</p></th>
                                   <th><p>Entreprise</p></th>
                                   <th><p>Projets</p></th>
                                   <th><p>Créé</p></th>
                                   <th><p>Action</p></th>
                              </thead>
                              <tbody>
                                   {allUsers && allUsers.map((item,index) => {
                                        return(
                                             <tr key={index}>
                                                  <td><p>{item.Prenom} {item.Nom}</p></td>
                                                  <td><p>{item.ID_entreprise}</p></td>
                                                  <td><p>{item.Titre}</p></td>
                                                  <td><p>{item.Date_creation}</p></td>
                                                  <td>
                                                       <Button className="dts_client" onClick={handleShowClient} value={item.ID}>...</Button>
                                                       <Button className="delete failed" onClick={handleDeleteClient} value={item.ID}><MdIcons.MdOutlineDeleteOutline /></Button>
                                                  </td>
                                             </tr>
                                        )
                                   })}
                              </tbody>
                         </table>
                    </Col> 
                    :    
                    <Col className="tbl" id="TblClients">
                         <h2>Entreprise</h2>
                         <table>
                              <thead>
                                   <th><p>Nom de l'entreprise</p></th>
                                   <th><p>Membres</p></th>
                                   <th><p>Créé</p></th>
                                   <th><p>Action</p></th>
                              </thead>
                              <tbody>
                                   {allEntreprise && allEntreprise.map((item,index) => {
                                        return(
                                             <tr key={index}>
                                                  <td><p>{item.Nom_societe}</p></td>
                                                  <td>
                                                  {allUsers && allUsers.filter(data => data.ID_entreprise === item.ID_entreprise).map((item,index) =>{
                                                       return(<span key={index} className="bdg_user">{item.Prenom.substring(0,1)}</span>)
                                                  })}</td>
                                                  <td><p>{Moment(item.Date_creation).format('DD-MM-YYYY')}</p></td>
                                                  <td>
                                                       <Button className="dts_client" onClick={handleShowEntreprise} value={item.ID_entreprise}>...</Button>
                                                  </td>
                                             </tr>
                                        )
                                   })}
                                   
                              </tbody>
                         </table>
                    </Col> 
               }
          </Row>

          <Row id="catchow">
               <h2>Ajouter des membres</h2>
               <form id="addMember" onSubmit={handleMemberSubmit}>
                    <label>Entreprise</label>
                    <select name="id_entr">
                        {allEntreprise && allEntreprise.map((item,index) => {
                              return(
                                   <option key={index} value={item.ID_entreprise}>{item.Nom_societe}</option>
                              )
                         })}
                    </select>
                    <label>Membres à ajouter</label>
                    <select name="members" multiple={true} onChange={handleChange}>
                         {allUsers && allUsers.map((item,index) => {
                              return(
                                   <option key={index} value={item.ID}>{item.Prenom} {item.Nom}</option>
                              )
                         })}
                    </select>
                         
                    <input type="submit" value="Ajouter"/>
               </form>
          </Row>

          {addClient === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         {/* <AjoutClient/> */}
                         <form id="newClient" onSubmit={handleSubmitClient}>
                              <label>Nom<input type="text" name="nom" placeholder="Bouchard" required></input></label>
                              <label>Prénom<input type="text" name="prenom" placeholder="Gerard" required></input></label>
                              <label>Mot de passe<input type="pass" name="pass" placeholder="*****" required></input></label>
                              <label>Adresse e-mail<input type="email" name="email" placeholder="gerard.bouchard@mail.com" required></input></label>
                              <label>Fonction<input type="text" name="fonction" placeholder="Chancelier suprême"></input></label>

                              <label>
                                   Choissisez une entreprise
                                   <select name="entreprise">
                                        <option selected="selected" value='' disabled>Aucune entreprise</option>
                                        {allEntreprise && allEntreprise.map((item,index) => {
                                             return(<option key={index} value={parseInt(item.ID_entreprise)}>{item.Nom_societe}</option>)
                                        })}
                                   </select>
                              </label>
                              <input type="submit" value="Créer"></input>
                         </form>
                    </div>  
               </Row>
          : ''}

          {addEntreprise === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         {/* <AjoutClient/> */}
                         <form id="newEntreprise" onSubmit={handleSubmitEntreprise}>
                              <table>
                                   <tbody>
                                        <tr><td colspan="2"><label>Nom société<input type="text" name="nomsoc" placeholder="Bouchard" required></input></label></td></tr>
                                        <tr><td colspan="2"><label>
                                                  Responsable
                                                  <select name="resp">
                                                       <option selected="selected" value='' disabled> - </option>
                                                       {allUsers && allUsers.map((item,index) => {
                                                            return(<option key={index} value={item.ID}>{item.Nom} {item.Prenom}</option>)
                                                       })}
                                                  </select>
                                             </label></td>
                                        </tr>
                                        <tr><td colspan="2"><label>TVA<input type="text" name="tva" placeholder="0123456789"></input></label></td></tr>
                                        <tr>
                                             <td><label>Adresse<input type="text" name="adress" placeholder="Rue de la Paix, 1"></input></label></td>
                                             <td><label>Code postal<input type="number" name="cp" placeholder="1000"></input></label></td>
                                        </tr>
                                        <tr>
                                             <td><label>Ville<input type="text" name="ville" placeholder="Bruxelles"></input></label></td>
                                             <td><label>Pays<input type="text" name="country" placeholder="Belgique" required></input></label></td>
                                        </tr>
                                        <tr><td colspan="2"><label>Téléphone<input type="tel" name="phone" placeholder="0123456789" required></input></label></td></tr>
                                        <tr><td colspan="2"><label>Site Internet<input type="text" name="site" placeholder="www.ahgency.be" required></input></label></td></tr>
                                        <tr><td colspan="2"><label>Adresse e-mail<input type="email" name="email" placeholder="gerard.bouchard@mail.com" required></input></label></td></tr>

                                        <tr>
                                             <td><label>Facebook<input type="text" name="fb" placeholder="Facebook" required></input></label></td>
                                             <td><label>Instagram<input type="text" name="ig" placeholder="Instagram" required></input></label></td>
                                        </tr>
                                        <tr>
                                             <td><label>Linkedin<input type="text" name="lkdin" placeholder="Linkedin" required></input></label></td>
                                             <td><label>Pinterest<input type="text" name="pint" placeholder="Pinterest" required></input></label></td>
                                        </tr>
                                        <tr><td colspan="2">
                                             <label>
                                                  Maintenance
                                                  <select name="maintenance">
                                                       <option selected="selected" value='0'> Non </option>
                                                       <option value='1'> Oui </option>
                                                  </select>
                                             </label>
                                        </td></tr>
                                        <tr><td colspan="2"><input type="submit" value="Créer"></input></td></tr>
                                   </tbody>
                              </table>
                         </form>
                    </div>  
               </Row>
          : ''}     

          {showDetails === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <h2>Détails Client</h2>

                         <div>
                              {dataClient.map((item,index) => {
                                   return(
                                        <table key={index}>
                                             <tr>
                                                  <td><p className="bold">ID Client :</p></td>
                                                  <td><p>{item.ID}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Role :</p></td>
                                                  <td><p>{item.Role}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Nom :</p></td>
                                                  <td><p>{item.Nom}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Prénom :</p></td>
                                                  <td><p>{item.Prenom}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Adresse mail :</p></td>
                                                  <td><p>{item.Email}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">ID Entreprise :</p></td>
                                                  <td><p>{item.ID_entreprise}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Fonction :</p></td>
                                                  <td><p>{item.Titre}</p></td>
                                             </tr>
                                             
                                             <tr>
                                                  <td><p className="bold">Minutes achetées :</p></td>
                                                  <td><p>{item.Minutes_Achetees}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Minutes restantes :</p></td>
                                                  <td><p>{item.Minutes_Restantes}</p></td>
                                             </tr>
                                        </table>
                                   )})}
                         </div>
                    </div>  
               </Row>
          : ''}

          {showDetailsEntr === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <h2>Détails Entreprise</h2>

                         <div>
                              {dataEntr.map((item,index) => {
                                   return(
                                        <table key={index}>
                                             <tr>
                                                  <td><p className="bold">ID Entreprise :</p></td>
                                                  <td><p>{item.ID_entreprise}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Nom société :</p></td>
                                                  <td><p>{item.Nom_societe}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Membres:</p></td>
                                                  <td><p>{item.Membres}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">TVA :</p></td>
                                                  <td><p>{item.TVA}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Adresse :</p></td>
                                                  <td><p>{item.Adresse}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Telephone :</p></td>
                                                  <td><p>{item.Telephone}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Email :</p></td>
                                                  <td><p>{item.Email}</p></td>
                                             </tr>
                                             <tr>
                                                  <td><p className="bold">Maintenance :</p></td>
                                                  <td>{item.Maintenance === 1 ? <p className="succeed">Contrat en ordre
                                                  </p> : <p className="failed">Aucun contrat</p>}</td>
                                             </tr>
                                             
                                             <tr>
                                                  <td><p className="bold">Site Web :</p></td>
                                                  <td><p>{item.Site_web}</p></td>
                                             </tr>

                                             <tr>
                                                  <td><p className="bold">Date création :</p></td>
                                                  <td><p>{Moment(item.Date_creation).format('DD-MM-YYYY')}</p></td>
                                             </tr>
                                        </table>
                                   )})}
                                   
                         </div>
                    </div>  
               </Row>
          : ''}

     </Container>
     </div>
      )
 }