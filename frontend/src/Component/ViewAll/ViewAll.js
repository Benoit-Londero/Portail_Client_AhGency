import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

import Button from 'react-bootstrap/Button';

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]); // Retourne toutes les tâches

     const [clients, setClients] = useState([]); // Retourne tous les clients
     const [idClient, setIdClient] = useState();

     const [filtredtasks, setFiltredtasks] = useState(null);
     const [detailTask, setdetailTask] = useState(false); // Modale affichage détails tâche
     const [updateTask, setupdateTask] = useState(false); // Modale update tâche
     const [value_dtls, setValueDetails] = useState();
     
     const [allProject, setAllProjects] = useState([]);

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
     }, [])

     function filtertask(clients_id){
          let filtredtasks = alltasks.filter(item => item.ID_Client === parseInt(clients_id));
          return filtredtasks;
     }

     function handleTasks(e) {
          let theClient = e.target.value;
          console.log(theClient);

          theClient !== "all" ? setFiltredtasks(filtertask(theClient)) : setFiltredtasks(alltasks);
          theClient === "all" ? setIdClient('') : setIdClient(theClient);
     }

     /* Filtre par Agent */
     function AssignedFiltertask(agent){
          let filtredtasks = alltasks.filter(item => item.Agent === agent);
          return filtredtasks;
     }

     function AssignedTasks(e) {
          let theAgent = e.target.value;
          console.log(theAgent);

          theAgent !== "all" ? setFiltredtasks(AssignedFiltertask(theAgent)) : setFiltredtasks(alltasks);
          theAgent === "all" ? setIdClient('') : setIdClient(theAgent);
     }
     /* Fin filtre par agent */

     /* Filtre par Projet */
     function ProjetFiltertask(projet){
          let filtredtasks = alltasks.filter(item => item.ID_Projet === parseInt(projet));
          return filtredtasks;
     }

     /* Ajout Benoit - Filtre par projet + mise à jour tâche (statut + temps + description) */
     function ProjectTasks(e){
          let theProjet = e.target.value;
          console.log(theProjet);

          setFiltredtasks(ProjetFiltertask(theProjet));
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
                    <tr><th><p className="failed">{props}</p></th></tr>
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
          e.preventDefault();
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
          if(data === "Timesheet mis à jour"){
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

               <div className="navbar_col_d">
                    <label>Filtrer par client</label>
                    <select onChange={handleTasks}>
                         <option name="default" disabled> Default </option>
                         {clients && clients.map((item,index) => {
                              return(
                                   <option  key={index} value={item.ID} className="client_list" >{item.Nom} {item.Prenom}</option>
                              ) 
                         })}
                    </select>
                    

               {/* A CORRIGER l'ID présent dans la colonne ID_Client n'est pas celle de l'ADMIN */}
                    <label> Assigné à</label>
                    <ul>
                         {clients.filter(data => data.Role === 'administrator').map((item,index) =>{
                              return(
                                   <li key={index}><Button onClick={AssignedTasks} value={item.Prenom + ' ' + item.Nom} className="assigned_to">{item.Prenom} {item.Nom}</Button></li>
                              )
                         })}
                    </ul>
               {/* FIN CORRECTION*/}

                    <label>Tous les projets</label>
                    <ul className="AllProjet_box">
                         {allProject.map((item,index) =>{
                              return(
                                   <li key={index}><Button className="primary_btn" onClick={ProjectTasks} value={item.ID}>{item.Tickets}</Button></li>
                              )
                         })}
                    </ul>
               </div>
          </div>
     </Row>
     <Container id="page_viewall" className="main__content">
          <Row className="customer_card_all timesheet">
               <div class="tableauTS">
                    <h2>{clients.filter(obj => obj.ID === parseInt(idClient)).map(item => item.Nom)}</h2>
               </div>

               <table>
                         <tbody>
                              <tr>
                                   <td><p>Minutes Totales : {clients.filter(obj => obj.ID === parseInt(idClient)).map(item => item.Minutes_Achetees)}</p></td>
                                   <td><p>Minutes Restantes : {clients.filter(obj => obj.ID === parseInt(idClient)).map(item => item.Minutes_Restantes)}</p></td>
                              </tr>
                         </tbody>
               </table>
               
               <table id="desktop list_all_tasks">
                         <thead>
                              <tr>
                              <td><h2>Tâches :</h2></td>
                              </tr>
                         </thead>
                         <tbody>

                         {filtredtasks && filtredtasks.map((item,index) => {

                         return (
                              <tr key={index} className="line_task">
                                   <td className="title_of_task"><p>{ item.Titre}</p></td>
                                   <td className="">{item_statut(item.Statut)}</td>
                                   {/* <td className="tasks__descr"><p>{ item.Informations.substring(0,100)}...</p></td> */}
                                   <td><p className="bdg_user"> {item.Agent.substring(0,1)}</p></td>
                                   <td classname="col_durée"><p>Durée : {item.time === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                   <td className="last-child"><Button className="btn btn_ts_bottom" value={item.ID_TS} onClick={handleAddTask}>Details</Button></td>
                                   <td><Button className="btn_ts_bottom" value={item.ID_TS} onClick={updateTheTask}>...</Button></td>
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
                                   <td><p className="bdg_user"> {item.Agent.substring(0,1)}</p></td>
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
                    <form method="POST">
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
                                        <td><p className="agent__"><span className="developer">{item.Agent.substring(0,1)}</span> {item.Agent}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</p></td>
                                        <td><p className="time_spend">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                   </tr>
                                   <tr><td><p className="bold"><BsIcons.BsTextParagraph/> Description</p></td></tr>
                                   <tr><td colspan="2"><p className="tasks">{ item.Informations}</p></td></tr>
                              </tbody>
                         </table>
                    </form>)
                    })}
               </div> 
               
               </Row>
          : ''}

          {updateTask === true ?
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         {alltasks.filter(item => item.ID_TS === parseInt(value_dtls)).map((item,index) => {

                         return(
                         <form id="updateTask" onSubmit={handleUpdate} method="POST">
                              <table className="detail_TS" key={index}>
                                   <thead>
                                        <tr>
                                             <th offset="1" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                        </tr>
                                        <tr>
                                             <th><p className="bold">Statut du projet</p></th>
                                             <th className="statut_task">
                                                  <select name="state">
                                                       <option value="En cours">En cours</option>
                                                       <option value="Terminée">Terminée</option>
                                                  </select>
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><p className="bold"><BsIcons.BsPerson/> Assigné</p></td>
                                             <td><p className="agent__"><span className="developer">{item.Agent.substring(0,1)}</span> {item.Agent}</p></td>
                                        </tr>
                                        <tr>
                                             <td><p className="bold"><MdIcons.MdOutlineMoreTime /> Suivi de temps</p></td>
                                             <td><input type="number" name="timeSpend"></input></td>
                                        </tr>
                                        <tr><td><p className="bold"><BsIcons.BsTextParagraph/>Description</p></td></tr>
                                        <tr><td colspan="2"><textarea name="descr_" className="tasks">{ item.Informations}</textarea></td></tr>
                                        <tr><td><input type="submit" name="updateTask" >Mettre à jour</input>
                                        <input type="hidden" name="id_task" value={item.ID}></input></td></tr>
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
