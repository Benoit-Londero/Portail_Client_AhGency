import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import { CircularProgressbar } from 'react-circular-progressbar';
//import { FaFileDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import Moment from "moment";

//import useLocalStorage from "../../useLocalStorage";

export default function Home() {

     const [timesheet, setTimesheet] = useState([]);
     const [filteredTS, setFilteredTS] = useState([]);
     //const [demande, setDemande] = useState([]);

     const currentIDU = (localStorage.getItem("currentIDU").replaceAll('"',''));
     //const currentUSR= (localStorage.getItem("currentUSR").replaceAll('"',''));
     const currentNOM = (localStorage.getItem("currentNOM").replaceAll('"',''));
     //const currentPNOM = (localStorage.getItem("currentPNOM").replaceAll('"',''));
     //const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));
     const currentHeureTOT = (localStorage.getItem("currentHeureTOT").replaceAll('"',''));
     const currentHeureREST = (localStorage.getItem("currentHeureREST").replaceAll('"',''));
     //const currentRole = (localStorage.getItem("currentRole").replaceAll('"',''));
     //const currentToken = (localStorage.getItem("currentToken").replaceAll('"',''));
     

     console.log(currentNOM);
     useEffect (() => {

          /*  ---   CODE CHELOU & OBSOLETE QUENTIN   ---  */
          /*
          let formdataUserID = document.getElementById('monformdata');
          console.log(formdataUserID); 

          <form id="monformdata"><input type="text" name="currentIDUser" value={currentIDU} readOnly hidden></input></form>

          */
          /*  --- FIN CODE CHELOU & OBSOLETE QUENTIN ---  */

          let dataU = {currentIDUser: currentIDU};

          fetch('/api/getTimesheet', { 
               method: 'POST', 
               body: JSON.stringify(dataU)
          })
          .then(res => res.json())
          .then(json => setTimesheet(json))
          .catch(err => console.info(err))
     }, [currentIDU])

     const handleFilter = (e) => {
          let IDTS = e.target.value;
          let filteredData = timesheet.filter(data => data.ID_TS === parseInt(IDTS));
          setFilteredTS(filteredData);
     }

     //Calcul temps restants (On soustrait le temps dépensé au temps total)
     const timeSpend = currentHeureTOT - currentHeureREST;

     //Calcul du montant dépensé (temps dépensé)
     const money_spend = Math.round(((timeSpend/60) * 75));
     const percentage = Math.round(((100*currentHeureREST) / currentHeureTOT));;

     return (

     <div>
     <NavBar />
     <Container id="page_dashboard">

          <span className="name_user">Hello, {currentNOM}</span>
          <h1>Bienvenue</h1>

          <Row>         
               <Col className="stats">
                    <h2>Statistiques</h2>
                                      
                    {percentage > 10 ? <CircularProgressbar
                         value={percentage}
                         text={`${percentage}%`}
                         styles={{
                              path: {
                                   strokeLinecap: 'round',
                                   transition: 'stroke-dashoffset 0.5s ease 0s',
                                   stroke: '#190933'
                              },
                              // Customize the circle behind the path, i.e. the "total progress"
                              trail: {
                                   stroke: '#e7e7e7',
                                   strokeLinecap: 'round',
                              },
                              
                              text: {
                                   transform: 'translate(-20px, 5px)',
                                   fontSize: '15px',
                                   fill: '#fff'
                              }
                         }}
                    /> : <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={{
                         path: {
                              strokeLinecap: 'round',
                              transition: 'stroke-dashoffset 0.5s ease 0s',
                              stroke: '#FF0000'
                         },
                         // Customize the circle behind the path, i.e. the "total progress"
                         trail: {
                              stroke: '#e7e7e7',
                              strokeLinecap: 'round',
                         },
                         
                         text: {
                              transform: 'translate(-20px, 5px)',
                              fontSize: '15px',
                              fill: '#FF0000'
                         }
                    }}
               />}
                    
                    <p>Heures achetées : {Math.round(currentHeureTOT /60)} h</p>
                    <p className="highlight">Heures restantes : {Math.trunc(currentHeureREST /60)} h {currentHeureREST % 60 } min</p><br/>
                    <p><b>Total dépensé : {money_spend} €</b></p>
                    {percentage > 10 ? null : <Link to ='/Credits'><Button>Recharger</Button></Link>}
               </Col>

               <Col className="tableauTS">
                    <h2>Dernières taches effectuées</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th>Titre</th>
                                   <th>Date</th>
                                   <th className="last-child">Action</th>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              timesheet.map((item,index) => {
                                   var date = Moment(item.Date_Tache_Effectuee).format('DD-MM-YYYY');
                                   return (
                                        <tr key={index}>
                                             <td><p className="ref">{ item.Titre}</p></td>
                                             <td><p>{date}</p></td>
                                             <td><button name = "Voirplus" class="btn_ts_bottom" value={item.ID_TS} onClick={handleFilter}> Voir plus </button></td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
               </Col>

               <Col className="tableauTS">
                    <h2>Demandes effectuées</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th>EN COURS DE DEVELOPPEMENT</th>
                              </tr>
                         </thead>
                         <tbody>
                         </tbody>
                    </table>
               </Col>
          </Row>

          <Row className="timesheet">
               <Col>                    
                    <table id="desktop">
                         <thead>
                              <tr>
                              <td colSpan="3"><h2>Timesheet</h2></td>
                              <td className="time_hrs_right"> {(Math.round((timeSpend /60)*10)/10) + " / " + Math.round((currentHeureTOT /60)*10)/10 + " H"} </td>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              filteredTS.map((item,index) => {
                                   var date = Moment(item.Date_Tache_Effectuee).format('DD-MM-YYYY');
                                   return (
                                        <tr className="detail_TS" key={index}>
                                             <td><p className="tasks">{ item.Informations}</p></td>
                                             <td><p>{ date }</p></td>
                                             <td><p>{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                             <td><p className="developer"> {item.Agent}</p></td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
                    
                    <div class="mobile">
                         <h2>Détails</h2>
                         <p className="time_hrs_right"> {(Math.round((timeSpend /60)*10)/10) + " / " + Math.round((currentHeureTOT /60)*10)/10 + " H"}</p>

                         {filteredTS.map((item,index) => {
                              var date = Moment(item.Date_Tache_Effectuee).format('DD-MM-YYYY');
                              return(
                              <table key={index} class="mobile">
                                   <thead></thead>
                                   <tbody>
                                        <tr><td><p className="tasks">{ item.Informations}</p></td></tr>
                                        <tr><td><p>{ date }</p></td></tr>
                                        <tr><td><p>{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td></tr>
                                        <tr><td><p className="developer"> {item.Agent}</p></td></tr>
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
