import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import { FaFileDownload, FaMonument } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Moment from "moment";

export default function Home() {

     const currentIDU = sessionStorage.getItem("currentIDU");
     const currentUSR = sessionStorage.getItem("currentUSR");
     const currentNOM = sessionStorage.getItem("currentNOM");
     const currentPNOM = sessionStorage.getItem("currentPNOM");
     const currentMAIL = sessionStorage.getItem("currentMAIL");
     const currentHeureTOT = sessionStorage.getItem("currentHeureTOT");
     const currentHeureREST = sessionStorage.getItem("currentHeureREST");
     const currentRole = sessionStorage.getItem("currentRole");
     const currentToken = sessionStorage.getItem("currentToken");

     const [timesheet, setTimesheet] = useState([]);
     
     useEffect (() => {
          let formdataUserID = document.getElementById('monformdata');
          let dataU = new FormData(formdataUserID);
          console.log(dataU.get('currentIDUser'));
          fetch('/api/timesheet', { method: 'POST', body: dataU})
          .then(res => res.json())
          .then(json => setTimesheet(json))
          .catch(err => console.info(err))
     }, [])

     console.log(timesheet);
     //------------------------------------CODE CHELOU BENOIT---------------------------------------

               // Variables dev factures liées au profil 
               const facts = [
                    {reference : 'FA01229082022', date: '29.08.2022', url:'http://ahgency.be'},
                    {reference : 'FA01329315622', date: '02.09.2022', url:'http://ahgency.be'},
                    {reference : 'FA01498526522', date: '06.09.2022', url:'http://ahgency.be'}
               ]

               

     //------------------------------------CODE CHELOU BENOIT---------------------------------------


     //Calcul temps restants (On soustrait le temps dépensé au temps total)
     const timeSpend = currentHeureTOT - currentHeureREST;

     //Calcul du montant dépensé (temps dépensé)
     const money_spend = Math.round(((timeSpend/60) * 75));

     const percentage = Math.round(((100*currentHeureREST) / currentHeureTOT));

     return (

     <div>
     <NavBar />
     <form id="monformdata"><input type="text" name="currentIDUser" value={currentIDU} readOnly hidden></input></form>
     <Container id="page_dashboard">

          <Row>
               <Col className="resume">
                    <RiAccountCircleFill className="PPic" />
                    <h1>Hello {currentNOM} {currentPNOM}</h1>

                    {/* <p>{currentPNOM}</p>
                        <p>{currentNOM}</p> 
                    */}
                    <p>{currentMAIL}</p>
                    <Link to ='/Account'><Button>Vers mon profil</Button></Link>
               </Col>
               
               <Col className="stats">
                    <h2>Statistiques</h2>
                                      
                    <CircularProgressbar
                         value={percentage}
                         text={`${percentage}%`}
                         styles={{
                              path: {
                                strokeLinecap: 'round',
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                              },
                              // Customize the circle behind the path, i.e. the "total progress"
                              trail: {
                                strokeLinecap: 'round',
                              },
                         }}
                    />
                    
                    <p>Heures achetées : {Math.round(currentHeureTOT /60)} h</p>
                    <p className="highlight">Heures restantes : {Math.trunc(currentHeureREST /60)} h {currentHeureREST % 60 } min</p><br/>
                    <p><b>Total dépensé : {money_spend} €</b></p>
               </Col>

               <Col className="factures">
                    <h2>Dernières factures</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th>Référence</th>
                                   <th>Date</th>
                                   <th className="last-child">Action</th>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              facts.map((item,index) => {
                                   var date = Moment(item.date).format('DD-MM-YYYY');
                                   return (
                                        <tr key={index}>
                                             <td><p className="ref">{ item.reference}</p></td>
                                             
                                             <td><p>{date}</p></td>
                                             <td className="last-child"><a href={item.url} className="PDF_ddl"><FaFileDownload /></a></td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
               </Col>
          </Row>

          <Row className="timesheet">
               <Col>
                    
                    <table>
                         <thead>
                              <tr>
                              <td colSpan="4"><h2>Timesheet</h2></td>
                              <td className="time_hrs_right"> {(Math.round((timeSpend /60)*10)/10) + " / " + Math.round((currentHeureTOT /60)*10)/10 + " H"} </td>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              timesheet.map((item,index) => {
                                   var date = Moment(item.date).format('DD-MM-YYYY');
                                   return (
                                        <tr key={index}>
                                             <td><p>{item.ID}</p></td>
                                             <td><p className="tasks">{ item.informations}</p></td>
                                             <td><p>{ date}</p></td>
                                             <td><p>{ item.time === '' ? 'en cours' : item.time + ' min'} </p></td>
                                             <td><p className="developer"> {item.developpeur}</p></td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
               </Col>
          </Row>
     </Container>
     </div>
      )
 }
