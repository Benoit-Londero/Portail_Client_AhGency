import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';

import NavBar from "../NavBar/NavBar";
import "./Report.css";
import Moment from "moment";

import Button from 'react-bootstrap/Button';

export default function Report() {

     const [clients, setClients] = useState([]); // Retourne tous les clients
     const [allLogs, setAllLogs] = useState([]); // Contient l'ensemble des logs

     useEffect (() => {

          fetch('/api/getAllUsers')
               .then(res => res.json())
               .then(json => setClients(json))
               .catch(err => console.info(err))

          fetch('/api/getAllLogs')
               .then(res => res.json())
               .then(json => setAllLogs(json))
               .catch(err => console.info(err))

     }, [])

     /* Filtre par Agent */
     /* function AssignedFilterlogs(agent){
          let filtredLogs = allLogs.filter(item => item.ID_Admin === agent);
          return filtredLogs;     
     }

     function AssignedLogs(e) {
          let theAgent = e.target.value;
          theAgent !== "all" ? setFiltredlogs(AssignedFilterlogs(theAgent)) : setFiltredlogs(allLogs);
     } */
     /* Fin filtre par agent */

     return (
     <div>
          <NavBar />

          <Row>
               <div className="project_sidebar">
                    <div className="navbar_col_d filter_admin">
                         <label> Assigné à</label>
                         <ul>
                              {clients.filter(data => data.Role === 'administrator').map((item,index) =>{
                                   return(
                                        <li key={index}><Button value={item.Prenom + ' ' + item.Nom} className="assigned_to">{item.Prenom} {item.Nom}</Button></li>
                                   )
                              })}
                         </ul>
                    </div>
               </div>
          </Row>
     <Container id="page_viewall" className="main__content">
          <Row className="customer_card_all timesheet">
               <div>
                    <h2>Report :</h2>               
                    
                    <table>
                         <thead>
                              <tr>
                                   <th>Lundi</th>
                                   <th>Mardi</th>
                                   <th>Mercredi</th>
                                   <th>Jeudi</th>
                                   <th>Vendredi</th>
                              </tr>

                         </thead>
                         <tbody></tbody>
                         <tr>
                              <td class="Lundi">
                                   {allLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Monday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps}</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="succeed">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Mardi">
                                   {allLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Tuesday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span> { item.Temps}</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="succeed">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Mercredi">
                                   {allLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Wednesday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps}</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="succeed">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Jeudi">
                                   {allLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Thursday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps}</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="succeed">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Vendredi">
                                   {allLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Friday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps}</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="succeed">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                         </tr>
                    </table>
               </div>
          </Row>
     </Container>
     </div>
     )
}
