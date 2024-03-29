import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

import { NavLink } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]); // Retourne toutes les tâches

     const [clients, setClients] = useState([]); // Retourne tous les clients

     const [filtredtasks, setFiltredtasks] = useState(null);
     const [detailTask, setdetailTask] = useState(false); // Modale affichage détails tâche
     const [updateTask, setupdateTask] = useState(false); // Modale update tâche
     const [value_dtls, setValueDetails] = useState();
     
     const [allProject, setAllProjects] = useState([]);
     const [dtlProjet, setDetailProjet] = useState([]);
     const [allLogs, setAllLogs] = useState([]); // Contient l'ensemble des logs
     
     const [allEntreprise, setAllEntreprise] = useState([]);
     const [nomEnt, setNomEnt] = useState();
     const [calculTemps, setCalculTemps] = useState(0);


     const currentIDU = localStorage.getItem("currentIDU");

     useEffect (() => {
          fetch('/api/getAllTimesheet')
               .then(res => res.json())
               .then(json => setAllTasks(json))
               .catch(err => console.info(err))

          fetch('/api/getAllUsers')
               .then(res => res.json())
               .then(json => setClients(json))
               .catch(err => console.info(err))

          fetch('/api/getAllProjet')
               .then(res => res.json())
               .then(json => setAllProjects(json))
               .catch(err => console.info(err))

          fetch('/api/getAllLogs')
               .then(res => res.json())
               .then(json => setAllLogs(json))
               .catch(err => console.info(err))

          fetch('/api/getAllEntreprise')
               .then(res => res.json())
               .then(json => setAllEntreprise(json))
               .catch(err => console.info(err))
     }, [])

     function filtertask(clients_id){
          let filtredtasks = alltasks.filter(item => item.ID_Client === parseInt(clients_id));
          return filtredtasks;
     }

     function handleTasks(e) {
          let theClient = e.target.value;

          theClient !== "all" ? setFiltredtasks(filtertask(theClient)) : setFiltredtasks(alltasks);
          let taskFiltered = theClient !== "all" ? filtertask(theClient) : alltasks;

          let newArrayTemps = taskFiltered.map(item => item.Temps_Min_Tache);
          let calculTempsTotale = newArrayTemps.length === 0 ? 0 : newArrayTemps.reduce((accumulator, currentValue) => accumulator + currentValue);
          setCalculTemps(calculTempsTotale);
     }

     /* Filtre par Agent */
     function AssignedFiltertask(agent){
          let filtredtasks = alltasks.filter(item => item.Agent === agent);
          return filtredtasks;
     }

     function AssignedTasks(e) {
          let theAgent = e.target.value;

          theAgent !== "all" ? setFiltredtasks(AssignedFiltertask(theAgent)) : setFiltredtasks(alltasks);
          let taskFiltered = theAgent !== "all" ? AssignedFiltertask(theAgent) : alltasks;

          let newArrayTemps = taskFiltered.map(item => item.Temps_Min_Tache);
          let calculTempsTotale = newArrayTemps.length === 0 ? 0 : newArrayTemps.reduce((accumulator, currentValue) => accumulator + currentValue);
          setCalculTemps(calculTempsTotale);
     }
     /* Fin filtre par agent */

     /* Filtre par Projet */
     function ProjetFiltertask(projet){
          let filtredtasks = alltasks.filter(item => item.ID_Projet === parseInt(projet));
          return filtredtasks;
     }

     /* Ajout Benoit - Filtre par projet + mise à jour tâche (statut + temps + description) */
     function ProjectTasks(e){
          let idProjet = e.target.value;
          let detailProjet = allProject.filter(item => item.ID === parseInt(idProjet));
          let infoCurrentEntreprise = allEntreprise.filter(ent => ent.ID_entreprise === detailProjet[0].ID_entreprise);
          let projetFilteredTask = ProjetFiltertask(idProjet);
          let newArrayTemps = projetFilteredTask.map(item => item.Temps_Min_Tache);
          let calculTempsTotale = newArrayTemps.length === 0 ? 0 : newArrayTemps.reduce((accumulator, currentValue) => accumulator + currentValue);

          setFiltredtasks(projetFilteredTask);
          setDetailProjet(detailProjet);
          setNomEnt(infoCurrentEntreprise[0].Nom_societe)
          setCalculTemps(calculTempsTotale);
     }

     const closeTasks = (e) => {
          setdetailTask(false);
          setupdateTask(false);
     }

     const handleAddTask = (e) =>{
          setValueDetails(e.target.value);
          setdetailTask(true);
     }

     const updateTheTask = (e) => {
          setValueDetails(e.target.value);
          setupdateTask(true);
     }

     const item_statut = (props) => {
          if( props === "Non démarrée"){
               return(
                    <tr><th><p className="new">{props}</p></th></tr>
               );
          } else if( props === "En cours"){
               return(
                    <tr><th><p className="inProgress">{props}</p></th></tr>
               );
          } else {
               return(
                    <tr><th><p className="succeed">{props}</p></th></tr>
               )
          }
     }

     const handleUpdate = async e => {
          let updateTaskForm = document.getElementById('updateTask'); //on récupère l'élement <form> et ces différents <input>
          let upd_ = new FormData(updateTaskForm); //que l'on intègre à un formData
  
          const updateJSON = buildJsonFormData(upd_);
  
          //On crée une boucle pour transformer le FormData en JSON
          function buildJsonFormData(upd_){
                  const jsonFormData = {};
                  for(const pair of upd_){
                      jsonFormData[pair[0]] = pair[1];
                  }
                  return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
          }
  
          const response = await fetch('/api/PostUpdateTask', { 
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(updateJSON)
          })
  
          const data = await response.json();
          if(response.status === 200){
               console.log(data);
               setupdateTask(false);
          }
      }

     return (
     <div>
          <NavBar />

          <Row>
               <div className="project_sidebar">
                    <div className="navbar_col_g">
                         <h2>Suivi de projet</h2>

                         <label>Voir toute les tâches </label>
                         <button  value='all' className="btn primary_btn" onClick={handleTasks}>Tous</button>
                    </div>

                    <div className="navbar_col_d filter_admin">
                         <label>Filtrer par client</label>
                         <select onChange={handleTasks}>
                              <option name="default" disabled> Default </option>
                              {clients.filter(item => item.Role === 'Client').map((item,index) => {
                                   return(
                                        <option  key={index} value={item.ID} className="client_list" >{item.Prenom} {item.Nom}</option>
                                   ) 
                              })}
                         </select>
                         
                         <label> Assigné à</label>
                         <select onChange={AssignedTasks}>
                              <option name="default" disabled> Default </option>
                              {clients.filter(data => data.Role === 'administrator').map((item,index) =>{
                                   return(
                                        <option  key={index} value={item.Prenom + ' ' + item.Nom} className="client_list" >{item.Prenom} {item.Nom}</option>
                                   ) 
                              })}
                         </select>

                         <label>Tous les projets</label>
                         <ul className="AllProjet_box">
                              {allProject.map((item,index) =>{
                                   return(
                                        <li key={index}><Button className="primary_btn" onClick={ProjectTasks} value={item.ID}>{item.Tickets}</Button></li>
                                   )
                              })}
                         </ul>
                    </div>

                    <div className="navbar_col_g nav_planner">
                         <h2>Planning</h2>

                         <NavLink to="/Report"><Button className="btn noborder">Allez au planner</Button></NavLink>
                    </div>
               </div>
          </Row>
     <Container id="page_viewall" className="main__content">
          <Row>
               <Col className="tableauTS hide_mobile">
                    <table>
                         {dtlProjet.map((item,index) => {
                              return(
                                   <tbody>
                                        <tr>
                                             <td key={index} rowspan="3" className="first_col_pjt"><p className="bdg_user">{item.Tickets.substring(0,1)}</p></td>
                                             <td><h1>{item.Tickets}</h1><p>{nomEnt}</p><p className="date_creation">Créé le {Moment(item.Date).format('DD-MM-YYYY')}</p></td>
                                             <td className="col__timeToUse"><p className="ref allowed_time">Temps alloué : {Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                        </tr>
                                        <tr><td colspan="2"><h2>Description</h2><p className="descr__thead">{item.Description}</p></td></tr>
                                   </tbody>
                              )
                         })}             
                    </table>
               </Col>
          </Row>
          <Row className="customer_card_all timesheet">
               
               <table id="desktop list_all_tasks">
                    <thead>
                         <tr><td colspan="3"><h2>Tâches :</h2></td><td><p>Durée totale : {Math.trunc(calculTemps /60)} h {calculTemps % 60 } min</p></td></tr>
                    </thead>
                    <tbody>
                         {filtredtasks && filtredtasks.map((item,index) => {
                              return (
                                   <tr key={index} className="line_task">
                                        <td className="title_of_task"><p>{ item.Titre}</p></td>
                                        <td className="admin_view_task">{item_statut(item.Statut)}</td>
                                        <td><p className="bdg_user"> {item.Agent.substring(0,1)}</p></td>
                                        <td classname="col_durée"><p>Durée : {item.time === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                        <td className="last-child">
                                             <Button className="btn btn_ts_bottom" value={item.ID_TS} onClick={handleAddTask}>Details</Button>
                                             <Button className="btn_ts_bottom" value={item.ID_TS} onClick={updateTheTask}>...</Button>
                                        </td>
                                   </tr>
                              )
                         })}
                    </tbody>
               </table>

               <div class="mobile">
                    <h2>Liste des tâches réalisées :</h2>               
                    
                    <table>
                         {alltasks.map((item,index) => {
                              return(
                                   <tr key={index} className="line_task">
                                        <td className="title_of_task"><p>{ item.Titre }</p></td>
                                        <td className="time"><p>{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                        <td><p className="bdg_user"> {item.Agent}</p></td>
                                        <td><Button className="btn_ts_bottom" value={item.ID_TS} onClick={handleAddTask}>Details</Button></td>
                                   </tr>
                              )
                         })}
                    </table>
               </div>
          </Row>

          {detailTask === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         {alltasks.filter(item => item.ID_TS === parseInt(value_dtls)).map((item,index) => {

                         var day = Moment(item.Date_Tache_Effectuee).format('DD');
                         var Month = Moment(item.Date_Tache_Effectuee).format('MMM');

                         return(
                              <table className="detail_TS" key={index}>
                                   <thead>
                                        <tr>
                                             <th colspan="2"><p className="date_badge">{day}<br></br>{Month}</p><br></br><p className="title_of_task">{ item.Titre }</p></th>
                                             <th colspan="2" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                        </tr>
                                        <tr><th className="statut_task">{item_statut(item.Statut)}</th></tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><p className="bold"><BsIcons.BsPerson/> Assigné</p></td>
                                             <td><p className="agent__"><span className="developer">{item.Agent}</span> {item.Agent}</p></td>
                                        </tr>
                                        <tr>
                                             <td><p className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</p></td>
                                             <td><p className="time_spend">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                        </tr>
                                        <tr><td><p className="bold"><BsIcons.BsTextParagraph/> Description</p></td></tr>
                                        <tr><td colspan="2"><p className="tasks">{ item.Informations}</p></td></tr>
                                   </tbody>
                              </table>
                         )
                         })}

                         <table>
                              <thead>
                                   <th><td colspan="3"><p className="bold">Logs</p></td></th>
                              </thead>
                              
                              <tbody>
                                   {allLogs.filter(item => item.ID_Tache === parseInt(value_dtls)).map((item,index) =>{
                                        return(
                                             <tr>
                                                  <td><p>{Moment(item.Date_entree).format("DD MM YY")}</p></td>
                                                  <td><p>{item.Temps} min.</p></td>
                                                  <td><p>{item.Détails}</p></td>
                                             </tr>
                                        )
                                   })}
                              </tbody>
                         </table>
                    </div> 

                    <div id="modal_desktop" className="mobile">
                         {alltasks.filter(item => item.ID_TS === parseInt(value_dtls)).map((item,index) => {

                         var day = Moment(item.Date_Tache_Effectuee).format('DD');
                         var Month = Moment(item.Date_Tache_Effectuee).format('MMM');

                         return(
                              <table className="detail_TS" key={index}>
                                   <thead>
                                        <tr>
                                             <th colspan="2"><p className="date_badge">{day}<br></br>{Month}</p><br></br><p className="title_of_task">{ item.Titre }</p></th>
                                             <th colspan="2" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                        </tr>
                                        <tr><th className="statut_task">{item_statut(item.Statut)}</th></tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><p className="bold"><BsIcons.BsPerson/> Assigné</p></td>
                                             <td><p className="agent__"><span className="developer">{item.Agent}</span> {item.Agent}</p></td>
                                        </tr>
                                        <tr>
                                             <td><p className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</p></td>
                                             <td><p className="time_spend">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                        </tr>
                                        <tr><td><p className="bold"><BsIcons.BsTextParagraph/> Description</p></td></tr>
                                        <tr><td colspan="2"><p className="tasks">{ item.Informations}</p></td></tr>
                                   </tbody>
                              </table>
                         )
                         })}

                         <table>
                              <thead>
                                   <th><td colspan="3"><p className="bold">Logs</p></td></th>
                              </thead>
                              
                              <tbody>
                                   {allLogs.filter(item => item.ID_Tache === parseInt(value_dtls)).map((item,index) =>{
                                        return(
                                             <tr>
                                                  <td><p>{Moment(item.Date_entree).format("DD MM YY")}</p></td>
                                                  <td><p>{item.Temps} min.</p></td>
                                                  <td><p>{item.Détails}</p></td>
                                             </tr>
                                        )
                                   })}
                              </tbody>
                         </table>
                    </div>
                    
               </Row>
          : ''}

          {updateTask === true ?
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         {alltasks.filter(item => item.ID_TS === parseInt(value_dtls)).map((item,index) => {

                         return(
                         <form id="updateTask" onSubmit={handleUpdate}>
                              <table className="detail_TS" key={index}>
                                   <thead>
                                        <tr>
                                             <th colspan="2" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                        </tr>
                                        <tr>
                                             <th><label for="state" className="bold">Statut de</label></th>
                                             <th className="statut_task">
                                                  <select name="state" required>
                                                       <option defaultValue={item.Statut} default disabled> - </option>
                                                       <option value="Non démarrée">Non démarée</option>
                                                       <option value="En cours">En cours</option>
                                                       <option value="Terminée">Terminée</option>
                                                  </select>
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><p className="bold"><BsIcons.BsPerson/> Assigné</p></td>
                                             <td><p className="agent__"> {item.Agent}</p></td>
                                        </tr>
                                        <tr>
                                             <td><label for="date_tache"><BsIcons.BsCalendarCheck/> Date d'éxecution<span className="required">*</span></label></td>
                                             <td><input type="date" placeholder="Date" id='date_tache' name="date_tache" required/></td>
                                        </tr>
                                        <tr>
                                             <td><label for="timeSpend" className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</label></td>
                                             <td><input type="number" id="timespend" name="timeSpend" defaultValue="0" required></input></td>
                                        </tr>
                                        <tr><td><label for="descr_" className="bold"><BsIcons.BsTextParagraph/>Détails action(s) réalisée(s)</label></td></tr>
                                        <tr><td colspan="2"><textarea name="descr_" className="tasks" required>{item.Informations}</textarea></td></tr>
                                        <tr><td colspan="2"><input type="submit" name="updateTask" value="Mettre à jour"></input>
                                        <input type="hidden" name="id_task" value={item.ID_TS}></input>
                                        <input type="hidden" name="idUser" value={currentIDU}></input>
                                        </td></tr>
                                   </tbody>
                              </table>
                         </form>)
                         })}
                    </div>

                    <div id="modal_desktop" className="mobile">
                         {alltasks.filter(item => item.ID_TS === parseInt(value_dtls)).map((item,index) => {
                         return(
                         <form id="updateTask" onSubmit={handleUpdate}>
                              <table className="detail_TS" key={index}>
                                   <thead>
                                        <tr>
                                             <th colspan="2" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                        </tr>
                                        <tr>
                                             <th><p className="bold">Statut du projet</p></th>
                                             <th className="statut_task">
                                                  <select name="state" required>
                                                       <option defaultValue={item.Statut} default disabled> - </option>
                                                       <option value="Non démarrée">Non démarée</option>
                                                       <option value="En cours">En cours</option>
                                                       <option value="Terminée">Terminée</option>
                                                  </select>
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><p className="bold"><BsIcons.BsPerson/> Assigné</p></td>
                                             <td><p className="agent__"><span className="bdg_user">{item.Agent}</span> {item.Agent}</p></td>
                                        </tr>
                                        <tr>
                                             <td><p className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</p></td>
                                             <td><input type="number" id="timespend" name="timeSpend" defaultValue="0" required></input></td>
                                        </tr>
                                        <tr><td><p className="bold"><BsIcons.BsTextParagraph/>Détails action(s) réalisée(s)</p></td></tr>
                                        <tr><td colspan="2"><textarea name="descr_" className="tasks" required>{item.Informations}</textarea></td></tr>
                                        <tr><td colspan="2"><input type="submit" name="updateTask" value="Mettre à jour"></input>
                                        <input type="hidden" name="id_task" value={item.ID_TS}></input>
                                        <input type="hidden" name="idUser" value={currentIDU}></input>
                                        </td></tr>
                                   </tbody>
                              </table>
                         </form>)
                         })}
                    </div> 
               </Row>
          : ''}   
     </Container>
     </div>
     )
}
