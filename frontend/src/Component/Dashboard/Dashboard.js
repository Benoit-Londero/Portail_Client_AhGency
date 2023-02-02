import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavBar from "../NavBar/NavBar";
import "./Home.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from "react-router-dom";
import Moment from "moment";

import AdminForm from "../AdminForm/AdminForm.js";

import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";


export default function Home() {

     const [timesheet, setTimesheet] = useState([]);
     const [projet, setProjet] = useState([]);
     const [projetFiltrer, setProjetFiltrer] = useState([]);
     const [filteredTS, setFilteredTS] = useState([]);
     const [filteredTaches, setFilteredTaches] = useState([]);
     const [checkPercent, setCheckPercent] = useState();
     const [newTask, setnewTask] = useState(false);
     const [detailTask, setdetailTask] = useState(false);

     const [currentHeureTOT, setCurrentHeureTOT] = useState();
     const [currentHeureREST, setCurrentHeureREST] = useState();
     const [moneySpend, setMoneySpend] = useState();

     const currentIDU = localStorage.getItem("currentIDU");
     const currentIDE = localStorage.getItem("currentIDE");

     useEffect (() => {

          let dataU = {currentIDUser: currentIDU};
          let dataE = {currentIDEnt: currentIDE};

          const onLoad = async () => {
           
               const response = await fetch('/api/getInfosClient', { 
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify(dataU)
               })
           
               const data = await response.json();
               if(response.status === 200){
                    setCurrentHeureTOT(data[0].Minutes_Achetees);
                    setCurrentHeureREST(data[0].Minutes_Restantes);

                    //Calcul temps restants (On soustrait le temps dépensé au temps total)
                    const timeSpend = data[0].Minutes_Achetees - data[0].Minutes_Restantes;

                    //Calcul du montant dépensé (temps dépensé)
                    setMoneySpend(Math.round(((timeSpend/60) * 75)));

                    if (parseInt(data[0].Minutes_Achetees) === 0) {
                         const percentage = 0;
                         setCheckPercent(percentage);
                    } else {
                         const percentage = Math.round(((100*data[0].Minutes_Restantes) / data[0].Minutes_Achetees));
                         setCheckPercent(percentage);
                    }
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          onLoad();

          fetch('/api/getTimesheet', { 
               method: 'POST', 
               body: JSON.stringify(dataU)
          })
          .then(res => res.json())
          .then(json => setTimesheet(json))
          .catch(err => console.info(err))

          fetch('/api/getProjet', { 
               method: 'POST', 
               body: JSON.stringify(dataE)
          })
          .then(res => res.json())
          .then(json => setProjet(json))
          .catch(err => console.info(err))

     }, [currentIDU, currentIDE])

     const handleFilter = (e) => {
          let IDTS = e.target.value;
          let filteredData = timesheet.filter(data => data.ID_TS === parseInt(IDTS));
          setFilteredTS(filteredData);
          setdetailTask(true);
     }

     const handleFilterProjet = (e) => {
          let IDProjet = e.target.value;
          let detailProjet = projet.filter(donnee => donnee.ID === parseInt(IDProjet));
          let tacheAssociee = timesheet.filter(data => data.ID_Projet === parseInt(IDProjet));
          setProjetFiltrer(detailProjet);
          setFilteredTaches(tacheAssociee);
     }

     /* const handleNoFilter = (e) => {
          setFilteredTaches(timesheet);
     } */

     /* AJOUT BENOIT - DECEMBRE 2022 */

     const handleAddTask = (e) =>{
          setnewTask(true);
     }

     const closeTasks = (e) => {
          setnewTask(false);
          setdetailTask(false);
     }
     
     return (

     <div>
     <NavBar />
     
     <div className="project_sidebar">
          <h2><FiIcons.FiZap/> Mes projets</h2>

          <ul>
               {projet.map((item,index) => {
                    return (
                         <li key={index}>
                              <button name = "Voirplus" class="links_btn" value={item.ID} onClick={handleFilterProjet}>{item.Tickets}</button>
                         </li>
                        )
               })}
          </ul>
               
          <div className="stats">
               <h2>Statistiques</h2>
                                      
               {checkPercent > 10 ? <CircularProgressbar
                    value={checkPercent}
                    text={`${checkPercent}%`}
                    styles={{
                         path: {
                              strokeLinecap: 'round',
                              transition: 'stroke-dashoffset 0.5s ease 0s',
                              stroke: '#3FB58F'
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
               value={checkPercent}
               text={`${checkPercent}%`}
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
                    
               <p>Achetées : {Math.round(currentHeureTOT /60)} h</p>
               <p>Restantes : {Math.trunc(currentHeureREST /60)} h {currentHeureREST % 60 } min</p><br/>
               <p><b>Dépensé : {moneySpend} €</b></p>
               {checkPercent > 10 ? null : <Link to ='/Credits'><Button className="recharger">Recharger</Button></Link>}
          </div>
     </div>


     <Container id="page_dashboard">
          <Row>
               <Col className="tableauTS">
               
                    <table>
                         <tbody>
                              {projetFiltrer.map((item,index) => {
                                   return(
                                   <tr>
                                        <td key={index} rowspan="3" className="first_col_pjt"><p className="date_badge">{item.Tickets.substring(0,1)}</p></td>
                                        <td><h1>{item.Tickets}</h1><p className="date_creation">{Moment(item.Date).format('DD-MM-YYYY')}</p></td>
                                        <td className="col__timeToUse"><p className="ref allowed_time">Temps alloué : {Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                   </tr>)
                              })
                              }
                              <tr> 
                                   <td><h2>Description</h2>{projetFiltrer.map((item,index)=>{
                                        return(<p key={index} className="descr__thead">{item.Description}</p>)
                                   })}</td>
                              </tr>
                              <tr>
                                   <td>{projetFiltrer.map((item,index)=>{
                                        return(<p key={index}><span className="developer">{item.Email.substring(0,1)}</span>{item.Email}</p>)})}</td>
                              </tr>
                         </tbody>
                    </table>
                    
                    {/* <table>
                         <thead>
                              <tr>
                                   <th className="hide_mobile">Créé le</th>
                                   <th className="allowed_time">Temps alloué</th>
                              </tr>
                         </thead>
                         {
                              projetFiltrer.map((item,index) => {
                                   let day = Moment(item.Date).format('DD');
                                   let Month = Moment(item.Date).format('MMM');
                                   return (
                                        <tbody>
                                             <tr key={index}>
                                                  <td><p className="date_badge hide_mobile">{day}<br></br>{Month}.</p></td>
                                                  <td><p className="ref allowed_time">{Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                             </tr>
                                             <tr>
                                                  <th colspan="2">Description</th>
                                             </tr>
                                             <tr>
                                                  <td colspan="2" rowspan="3"><p className="descr__prjt">{item.Description}</p></td>
                                             </tr>
                                        </tbody>
                                   )
                              })
                         }
                    </table> */}
               </Col>
          </Row>

          <Row>
          <Col className="tableauTask">
                    <h2>Tâches</h2>
                    <table>
                         {/*<thead>
                              <tr>
                                   <th className="hide_mobile">Date</th>
                                   <th>Titre</th>
                                   <th className="last-child">Action</th>
                              </tr>
                         </thead> */}
                         <tbody>
                         {
                              filteredTaches.map((item,index) => {
                                   /* let day = Moment(item.Date_Tache_Effectuee).format('DD');
                                   let Month = Moment(item.Date_Tache_Effectuee).format('MMM'); */
                                   return (
                                        <tr key={index}>
                                             {/* <td><p className="hide_mobile">{day}<br></br>{Month}.</p></td> */}
                                             <td><p className="task_table">{ item.Titre}</p></td>
                                             <td><p className="task_table">{Moment(item.Date_Tache_Effectuee).format('DD-MM-YY')}</p></td>
                                             <td><p className="statut_task">{item.Statut}</p></td>
                                             <td className="last-child"><button name = "Voirplus" className="btn_ts_bottom" value={item.ID_TS} onClick={handleFilter}> Détails </button></td>
                                        </tr>
                                   )
                              })
                         }
                         {/* <tr><td><button name = "NoFilter" className="btn_ts_bottom" onClick={handleNoFilter}>Voir toutes les tâches</button></td></tr> */}
                         <tr><td><button name="addTask" className="add_new_task btn btn_primary" onClick={handleAddTask}>créer une nouvelle tâche</button></td></tr>
                         </tbody>
                    </table>
               </Col>

          </Row>

          {detailTask === true ? <Row className="modal__newTask">
               
               <Col>     
                    <button className="close_modale" onClick={closeTasks}>X</button>
                                 
                         {
                              filteredTS.map((item,index) => {
                                   var day = Moment(item.Date_Tache_Effectuee).format('DD');
                                   var Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                                   return (  
                                        <div id="desktop">                                
                                             {/* <table className="detail_TS" key={index}>  
                                                  <thead>
                                                       <tr>
                                                            <th><p className="title_of_task">{ item.Titre }</p></th>
                                                            <th> <p className="date_badge">{day}<br></br>{Month}</p>
                                                                 <p className="time_spend">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p>
                                                            </th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       <tr>
                                                            <td>
                                                                 <h2>Description</h2>
                                                                 <p className="tasks">{ item.Informations}</p>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <td><p className="agent__">Assigné à :<span className="developer">{item.Agent.substring(0,1)}</span></p></td>
                                                       </tr>
                                                  </tbody>
                                             </table> */}

                                             <table className="detail_TS" key={index}>
                                                  <thead>
                                                       <tr><th colspan="2"><p className="title_of_task">{ item.Titre }</p></th></tr>
                                                       <tr><th colspan="2"><p className="date_badge">{day}<br></br>{Month}</p></th></tr>
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
                                        </div> 
                                   )
                              })
                         }

                         
                    
                    
                    <div class="mobile">
                         <h2>Détails</h2>

                         {filteredTS.map((item,index) => {
                              /* var date = Moment(item.Date_Tache_Effectuee).format('DD-MM-YYYY'); */

                              var day = Moment(item.Date_Tache_Effectuee).format('DD');
                              var Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                              
                              return(
                              <table key={index} class="mobile">
                                   <thead></thead>
                                   <tbody>
                                        <tr>
                                             <td className="col_mobile_badge"><p className="date_badge">{day}<br></br>{Month}</p></td>
                                             <td>
                                                  <p className="title_of_task">{ item.Titre }</p>
                                                  <p className="dateoftask">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p>
                                                  <p className="developer"> {item.Agent}</p>
                                                  <p className="tasks">{ item.Informations}</p>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>)
                         })
                         }                    
                    </div> 
               </Col> 
          </Row> : ''}
     </Container>

     {newTask === true ? <div className="modal__newTask"><button className="close_modale" onClick={closeTasks}>X</button><AdminForm/></div> : ''}
     </div>
      )
 }