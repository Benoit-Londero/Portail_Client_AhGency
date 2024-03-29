import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';

import NavBar from "../NavBar/NavBar";
import { NavLink } from "react-router-dom";
import "./Report.css";
import Moment from "moment";

import Button from 'react-bootstrap/Button';

export default function Report() {

     const [clients, setClients] = useState([]); // Retourne tous les clients
     const [allLogs, setAllLogs] = useState([]); // Contient l'ensemble des logs
     const [filteredLogs, setFilteredLogs] = useState([]); // Filtre les logs

     const [startDate, setStartDate] = useState(null); // state to store start date
     const [endDate, setEndDate] = useState(null); // state to store end date

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
     function AssignedFilterlogs(agent){
          let filtredLogs = allLogs.filter(item => item.ID_Admin === parseInt(agent));
          return filtredLogs; 
     }

     function AssignedLogs(e) {
          let theAgent = e.target.value;
          theAgent !== "all" ? setFilteredLogs(AssignedFilterlogs(theAgent)) : setFilteredLogs(allLogs);
     }

     /** Filtre par DateRange */
     const handleFilter = () => {
          // Filter logs based on start and end date
          const dateRange = allLogs.filter(
               data => Moment(data.Date_entree).utc().format("yyyy-MM-DD") >= Moment(startDate).format("yyyy-MM-DD") 
               && Moment(data.Date_entree).utc().format("yyyy-MM-DD") <= Moment(endDate).format("yyyy-MM-DD"));

          setFilteredLogs(dateRange);

          console.log(filteredLogs);
          console.log('UTC : ' + Moment("2023-01-30T23:00:00.000Z").utc().format("yyyy-MM-DD"))
          console.log('UTC : ' + Moment("2023-01-30T23:00:00.000Z").utc().format('dddd'));

          console.log('DEFAULT : ' + Moment("2023-01-30T23:00:00.000Z").format('dddd'));
          console.log('DEFAULT : ' + Moment("2023-01-30T23:00:00.000Z").format("yyyy-MM-DD"))

          console.log(Moment("2023-01-30T23:00:00.000Z").format("yyyy-MM-DD") >= Moment(startDate).utc().format("yyyy-MM-DD"));
          console.log(Moment("2023-01-30T23:00:00.000Z").utc().format("yyyy-MM-DD") >= Moment(startDate).utc().format("yyyy-MM-DD"))

          console.log('Monday UTC : ' + Moment("2023-01-30T23:00:00.000Z").utc().format("dddd") === "Monday")
          console.log('Monday : ' + Moment("2023-01-30T23:00:00.000Z").utc().format("dddd") === "Monday")

     };
     
     return (
     <div>
          <NavBar />

          <Row>
               <div className="project_sidebar">
                    <div className="navbar_col_d filter_admin">
                          <h2>Planning</h2>
                         <label> Planning de : </label>
                         <ul>
                              <li><Button value="all" onClick={AssignedLogs} className="assigned_to">Toute l'équipe</Button></li>
                              {clients.filter(data => data.Role === 'administrator').map((item,index) =>{
                                   return(
                                        <li key={index}><Button value={item.ID} onClick={AssignedLogs} className="assigned_to">{item.Prenom} {item.Nom}</Button></li>
                                   )
                              })}
                         </ul>

                         <div>
                         <label>Filtrer par date</label>
                         <label htmlFor="start-date">Date de debut:</label>
                         <input
                              type="date"
                              id="start-date"
                              value={startDate}
                              onChange={e => setStartDate(e.target.value)}
                         />
                         <label htmlFor="end-date">Date de fin:</label>
                         <input
                              type="date"
                              id="end-date"
                              value={endDate}
                              onChange={e => setEndDate(e.target.value)}
                         />
                         <button onClick={handleFilter}>Filtrer</button>
                    </div>
                    </div>

                    <div className="navbar_col_g nav_planner">
                         <h2>Projets</h2>

                         <NavLink to="/ViewAll"><Button className="btn noborder">Allez aux projets</Button></NavLink>
                    </div>
               </div>
          </Row>
     <Container id="page_Report" className="main__content">
          <Row className="customer_card_all timesheet">
               <div>
                    <h2>Planning :</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th><h2 className="bold">Lundi</h2></th>
                                   <th><h2 className="bold">Mardi</h2></th>
                                   <th><h2 className="bold">Mercredi</h2></th>
                                   <th><h2 className="bold">Jeudi</h2></th>
                                   <th><h2 className="bold">Vendredi</h2></th>
                              </tr>

                         </thead>
                         <tbody></tbody>
                         <tr>
                              <td class="Lundi">
                                   {filteredLogs.filter(data => Moment(data.Date_entree).format("dddd") === "Monday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span> { item.Temps} min.</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="inProgress">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Mardi">
                                   {filteredLogs.filter(data => Moment(data.Date_entree).format("dddd") === "Tuesday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span> { item.Temps} min.</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="inProgress">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Mercredi">
                                   {filteredLogs.filter(data => Moment(data.Date_entree).format("dddd") === "Wednesday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps} min.</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="inProgress">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Jeudi">
                                   {filteredLogs.filter(data => Moment(data.Date_entree).format("dddd") === "Thursday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps} min.</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="inProgress">{item.Prenom} {item.Nom}</p>
                                                       )
                                                  })}
                                                  <p>{ item.Détails}</p>
                                             </div>
                                        )
                                   })}
                              </td>
                              <td class="Vendredi">
                                   {filteredLogs.filter(data => Moment(data.Date_entree).format('dddd') === "Friday").map((item,index) => {
                                        return(
                                             <div className="card_Report" key={index}>
                                                  <p><span className="bold">Durée :</span>{ item.Temps} min.</p>
                                                  {clients.filter(data => parseInt(data.ID) === parseInt(item.ID_Admin)).map((item,index) => {
                                                       return(
                                                            <p key={index} className="inProgress">{item.Prenom} {item.Nom}</p>
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
