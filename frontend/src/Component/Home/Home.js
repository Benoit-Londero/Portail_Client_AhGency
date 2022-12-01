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

export default function Home() {

     const [timesheet, setTimesheet] = useState([]);
     const [projet, setProjet] = useState([]);
     const [filteredTS, setFilteredTS] = useState([]);
     const [filteredTaches, setFilteredTaches] = useState([]);
     const [checkPercent, setCheckPercent] = useState();

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
                    setCurrentHeureTOT(data.Minutes_Achetees);
                    setCurrentHeureREST(data.Minutes_Restantes);

                    //Calcul temps restants (On soustrait le temps dépensé au temps total)
                    const timeSpend = data.Minutes_Achetees - data.Minutes_Restantes;

                    //Calcul du montant dépensé (temps dépensé)
                    setMoneySpend(Math.round(((timeSpend/60) * 75)));


                    if (parseInt(data.Minutes_Achetees) === 0) {
                         const percentage = 0;
                         setCheckPercent(percentage);
                    } else {
                         const percentage = Math.round(((100*data.Minutes_Restantes) / data.Minutes_Achetees));
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
     }

     const handleFilterProjet = (e) => {
          let IDProjet = e.target.value;
          let tacheAssociee = timesheet.filter(data => data.ID_Projet === parseInt(IDProjet));
          setFilteredTaches(tacheAssociee);
     }

     const handleNoFilter = (e) => {
          setFilteredTaches(timesheet);
     }


     return (

     <div>
     <NavBar />
     <Row>
          <div className="project_sidebar">
               <ul>
                    <li><button className="links_btn" onClick={handleProject} value="all"><FiIcons.FiZap/> Tous les projets</button></li>
                    <li><button className="links_btn" onClick={handleProject} value="archives"><FiIcons.FiArchive/> Archives</button></li>
                    <li><button className="links_btn" onClick={handleProject} value="mine"><FiIcons.FiPlus/> Créer un projet</button></li>
               </ul>
          </div>
     </Row>


     <Container id="page_dashboard">

          <Row>         
               <Col className="stats" xl={4} md={4}>
                    <h2>Statistiques</h2>
                                      
                    {checkPercent > 10 ? <CircularProgressbar
                         value={checkPercent}
                         text={`${checkPercent}%`}
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
                    
                    <p>Heures achetées : {Math.round(currentHeureTOT /60)} h</p>
                    <p className="highlight">Heures restantes : {Math.trunc(currentHeureREST /60)} h {currentHeureREST % 60 } min</p><br/>
                    <p><b>Total dépensé : {moneySpend} €</b></p>
                    {checkPercent > 10 ? null : <Link to ='/Credits'><Button>Recharger</Button></Link>}
               </Col>

               <Col className="tableauTS">
                    <h2>Projet</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th className="hide_mobile">Date</th>
                                   <th>Titre</th>
                                   <th>Temps alloué</th>
                                   <th></th>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              projet.map((item,index) => {
                                   let day = Moment(item.Date).format('DD');
                                   let Month = Moment(item.Date).format('MMM');
                                   return (
                                        <tr key={index}>
                                             <td><p className="date_badge hide_mobile">{day}<br></br>{Month}.</p></td>
                                             <td><p className="ref">{item.Tickets}</p></td>
                                             <td><p className="ref">{Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                             <td><button name = "Voirplus" class="btn_ts_bottom" value={item.ID} onClick={handleFilterProjet}> Tâches associées </button></td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
               </Col>

               <Col className="tableauTS">
                    <h2>Dernières taches effectuées</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th className="hide_mobile">Date</th>
                                   <th>Titre</th>
                                   <th className="last-child">Action</th>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              filteredTaches.map((item,index) => {
                                   let day = Moment(item.Date_Tache_Effectuee).format('DD');
                                   let Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                                   return (
                                        <tr key={index}>
                                             <td><p className="date_badge hide_mobile">{day}<br></br>{Month}.</p></td>
                                             <td><p className="ref">{ item.Titre}</p></td>
                                             <td><button name = "Voirplus" className="btn_ts_bottom" value={item.ID_TS} onClick={handleFilter}> Détails </button></td>
                                        </tr>
                                   )
                              })
                         }
                         <tr><td><button name = "NoFilter" className="btn_ts_bottom" onClick={handleNoFilter}>Voir toutes les tâches</button></td></tr>
                         </tbody>
                    </table>
               </Col>
          </Row>

          <Row className="timesheet">
               <Col>     
                    <table id="desktop">               
                         <thead>
                              <tr>
                              <td colSpan="3"><h2>Détails</h2></td>
                              </tr>
                         </thead>
                         <tbody>
                         {
                              filteredTS.map((item,index) => {
                                   var day = Moment(item.Date_Tache_Effectuee).format('DD');
                                   var Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                                   return (                                   
                                        <tr className="detail_TS" key={index}>
                                             <td>
                                                  <table>
                                                       <tr>
                                                            <td><p className="date_badge">{day}<br></br>{Month}</p></td>
                                                            <td><p className="title_of_task">{ item.Titre }</p></td>
                                                            <td><p>{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                                            <td><p className="developer"> {item.Agent}</p></td>
                                                       </tr>
                                                       <tr><td colspan="4"><p className="tasks">{ item.Informations}</p></td></tr>
                                                       {/* AMELIORATION <tr><td><p>timeline</p></td></tr> */}
                                                  </table>
                                             </td>
                                        </tr>
                                   )
                              })
                         }
                         </tbody>
                    </table>
                    
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
          </Row>
     </Container>
     </div>
      )
 }
