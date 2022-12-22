import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]);
     const [clients, setClients] = useState([]);
     const [idClient, setIdClient] = useState();
     const [filtredtasks, setFiltredtasks] = useState(null);
     
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

     return (
     <div>
          <NavBar />

          <Row>
          <div className="project_sidebar">
               <div className="navbar_col_g">
                    <h2>Suivi de projet</h2>

                    <label>Voir toute les tâches </label>
                    <button  value='all' className="client_list" onClick={handleTasks}>Tous</button>
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
     <Container id="page_viewall">
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
               
                    <table id="desktop">
                         <thead>
                              <tr>
                              <td><h2>Tâches :</h2></td>
                              </tr>
                         </thead>
                         <tbody>

                         {filtredtasks && filtredtasks.map((item,index) => {

                         var day = Moment(item.Date_Tache_Effectuee).format('DD');
                         var Month = Moment(item.Date_Tache_Effectuee).format('MMM');

                         return (
                              <tr key={index}>
                                   <td><p className="date_badge">{day}<br></br>{Month}.</p></td>
                                   <td><p>{ item.Titre}</p></td>
                                   <td className='fst_col'><p className="tasks">{ item.Informations}</p></td>
                                   <td><p>{item.time === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                   <td><p className="developer"> {item.Agent.substring(0,1)}</p></td>
                              </tr>
                              )
                         })}
                         </tbody>
                    </table>

                    <div class="mobile">
                         <h2>Liste des tâches réalisées :</h2>

                         {filtredtasks && filtredtasks.map((item,index) => {

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
                                                  <p className="tasks">{ item.Informations}</p>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>)
                         })
                         }
                    </div>
               </Col>
          </Row>
     </Container>
     </div>
      )
 }
