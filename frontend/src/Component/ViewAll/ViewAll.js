import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

import Button from 'react-bootstrap/Button';

import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]);
     const [clients, setClients] = useState([]);
     const [idClient, setIdClient] = useState();
     const [filtredtasks, setFiltredtasks] = useState(null);
     const [value_dtls, setValueDetails] = useState(); 

     const [detailTask, setdetailTask] = useState(false);
     
     useEffect (() => {

          fetch('/api/getAllTimesheet')
               .then(res => res.json())
               .then(json => setAllTasks(json))
               .catch(err => console.info(err))

          fetch('/api/getAllUsers')
               .then(res => res.json())
               .then(json => setClients(json))
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

     const closeTasks = (e) => {
          setdetailTask(false);
     }

     const handleAddTask = (e) =>{
          setValueDetails(e.target.value);
          setdetailTask(true);
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
               </div>
          </div>
     </Row>
     <Container id="page_viewall" className="main__content">
          <Row className="customer_card_all timesheet">
               <Col>

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

                         /* var day = Moment(item.Date_Tache_Effectuee).format('DD');
                         var Month = Moment(item.Date_Tache_Effectuee).format('MMM'); */

                         return (
                              <tr key={index} className="line_task">
                                   <td className="title_of_task"><p>{ item.Titre}</p></td>
                                   <td className="tasks__descr"><p>{ item.Informations.substring(0,100)}...</p></td>
                                   {/* <td><p className="date_badge_timesheet">{day} {Month}.</p></td> */}
                                   <td><p className="bdg_user"> {item.Agent.substring(0,1)}</p></td>
                                   <td classname="col_durée"><p>Durée : {item.time === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                   <td className="last-child"><Button className="btn btn_ts_bottom" value={item.ID_TS} onClick={handleAddTask}>Details</Button></td>
                              </tr>
                              )
                         })}
                         </tbody>
                    </table>

                    <div class="mobile">
                         <h2>Liste des tâches réalisées :</h2>

                         {alltasks.map((item,index) => {

                              var day = Moment(item.Date_Tache_Effectuee).format('DD');
                              var Month = Moment(item.Date_Tache_Effectuee).format('MMM');

                              return(
                              <table key={index} class="mobile">
                                   <thead></thead>
                                   <tbody>
                                        <tr>
                                             <td className="col_mobile_badge"><p className="date_badge">{day}<br></br>{Month}</p></td>
                                             <td className="col_right_descr">
                                                  <p className="title_of_task">{ item.Titre }</p>
                                                  <p className="time">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p>
                                                  <p className="developer"> {item.Agent.substring(0,1)}</p>
                                                  <p className="tasks">{item.Informations}</p>
                                                  <td><Button className="btn btn_ts_bottom" value={item.ID_TS} onClick={handleAddTask}>Details</Button></td>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>)
                         })}
                    </div>
               </Col>
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
                    </table>)
                    })}
               </div> 
               
               </Row>
          : ''}
          
     </Container>
     </div>
      )
 }
