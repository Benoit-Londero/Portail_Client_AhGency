import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";

import Moment from "moment";

import AdminForm from "../AdminForm/AdminForm.js";

import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Home() {

     const [timesheet, setTimesheet] = useState([]);
     const [projet, setProjet] = useState([]);
     const [projetFiltrer, setProjetFiltrer] = useState([]);
     const [filteredTS, setFilteredTS] = useState([]);
     const [filteredTaches, setFilteredTaches] = useState([]);

     const [newTask, setnewTask] = useState(false);
     const [detailTask, setdetailTask] = useState(false);

     const  [handleDisplayMobile, sethandleDisplayMobile] = useState(false);

     const currentIDU = localStorage.getItem("currentIDU");
     const currentIDE = localStorage.getItem("currentIDE");

     useEffect (() => {

          let dataU = {currentIDUser: currentIDU};
          let dataE = {currentIDEnt: currentIDE};

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
          sethandleDisplayMobile(true);
          setProjetFiltrer(detailProjet);
          setFilteredTaches(tacheAssociee);
     }

     /* AJOUT BENOIT - DECEMBRE 2022 */

     const handleAddTask = (e) =>{
          setnewTask(true);
     }

     const closeTasks = (e) => {
          setnewTask(false);
          setdetailTask(false);
          sethandleDisplayMobile(false);
     }

     /* const setTrackingTime = () => {
          const startDate = new Date().format();
          const milliTime = Date.now();
          const timestamp = Math.floor(milliTime / 1000);

          /* const email = "benoit@ahgency.be";
          const pass = "XgvetInHe69PGoo2f474o" */

          /* fetch("https://api.track.toggl.com/api/v9/workspaces/6916769/time_entries", {
               method: "POST",
               body: {
                    "description": "Test new timeStamp",
                    "start": startDate,
                    "duration": (-1 * timestamp),
                    "pid": 188082635,
                    "created_with":"Portail Client",
                    "wid":6916769,
               },
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Basic YmVub2l0QGFoZ2VuY3kuYmU6WGd2ZXRJbkhlNjlQR29vMmY0NzRv'
               },
          })
          .then((resp) => resp.json())
          .then((json) => {
               console.log(json);
          })
          .catch(err => console.error(err));
     } */
     
     return (

     <div>
     <NavBar />
     
     <div className="project_sidebar">
          <h2><FiIcons.FiZap/> Tous les projets</h2>

          <ul>
               {projet.map((item,index) => {
                    return (
                         <li key={index}>
                              <button name = "Voirplus" class="btn primary_btn" value={item.ID} onClick={handleFilterProjet}>{item.Tickets}</button>
                         </li>
                    )
               })}
               <li><Link to ='/Projet'><Button className="btn disabled">+</Button></Link></li>
          </ul>

          
     </div>

     <Container id="page_adminprojet"  className="main__content">
          <Row>
               <table className="mobile">
                    {projet.map((item,index) => {
                         return(
                              <tr className="prjt_lst" key={index}>
                                   <td className="title_prjt">{item.Tickets}</td>
                                   <td>{item.ID_entreprise}</td>
                                   <td><span className="bdg_user">{item.Email.substring(0,1)}</span></td>
                                   <td><Button className="btn btn_primary" value={item.ID} onClick={handleFilterProjet}>Voir plus</Button></td>
                              </tr>
                         )
                    })}
               </table>
          </Row>
          <Row>
               <Col className="tableauTS hide_mobile">
                    <table>
                         <tbody>
                              {projetFiltrer.map((item,index) => {
                                   return(
                                   <tr>
                                        <td key={index} rowspan="3" className="first_col_pjt"><p className="bdg_user">{item.Tickets.substring(0,1)}</p></td>
                                        <td><h1>{item.Tickets}</h1><p className="date_creation">Cr???? le {Moment(item.Date).format('DD-MM-YYYY')}</p></td>
                                        <td className="col__timeToUse"><p className="ref allowed_time">Temps allou?? : {Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                   </tr>)
                              })
                              }
                              <tr> 
                                   <td colspan="2"><h2>Description</h2>{projetFiltrer.map((item,index)=>{
                                        return(<p key={index} className="descr__thead">{item.Description}</p>)
                                   })}</td>
                              </tr>
                         </tbody>
                    </table>
               </Col>
          </Row>

          <Row>
          <Col className="tableauTask hide_mobile">
                    <h2>T??ches</h2>
                    <table>
                         <tbody>
                         {
                              filteredTaches.map((item,index) => {
                                   return (
                                        <tr key={index} className="line_task">
                                             <td><p className="task_table">{ item.Titre}</p></td>
                                             <td><p className="task_table">{Moment(item.Date_Tache_Effectuee).format('DD-MM-YY')}</p></td>
                                             <td><p className="statut_task">{item.Statut}</p></td>
                                             <td className="last-child"><button name = "Voirplus" className="btn_ts_bottom" value={item.ID_TS} onClick={handleFilter}> D??tails </button></td>
                                        </tr>
                                   )
                              })
                         }
                         <tr><td><button name="addTask" className="add_new_task btn btn_primary" onClick={handleAddTask}>cr??er une nouvelle t??che</button></td></tr>
                         </tbody>
                    </table>
               </Col>
          </Row>

          {handleDisplayMobile === true ? <Row id="displayMobile">
               <button className="close_modale" onClick={closeTasks}>X</button>
               <Col className="tableauTS">
                    <table>
                         <tbody>
                              {projetFiltrer.map((item,index) => {
                                   return(
                                   <tr>
                                        <td key={index} rowspan="3" className="first_col_pjt"><p className="bdg_user">{item.Tickets.substring(0,1)}</p></td>
                                        <td><h1>{item.Tickets}</h1><p className="date_creation">Cr???? le {Moment(item.Date).format('DD-MM-YYYY')}</p></td>
                                        <td className="col__timeToUse"><p className="ref allowed_time">Temps allou?? : {Math.trunc(item.AllocationTemps /60)} h {item.AllocationTemps % 60 } min</p></td>
                                   </tr>)
                              })
                              }
                              <tr> 
                                   <td colspan="2"><h2>Description</h2>{projetFiltrer.map((item,index)=>{
                                        return(<p key={index} className="descr__thead">{item.Description}</p>)
                                   })}</td>
                              </tr>
                         </tbody>
                    </table>
               </Col>

               <Col className="tableauTask">
                    <h2>T??ches</h2>
                    <table>
                         <tbody>
                         {
                              filteredTaches.map((item,index) => {
                                   return (
                                        <tr key={index} className="line_task">
                                             <td><p className="task_table">{ item.Titre}</p></td>
                                             <td><p className="task_table">{Moment(item.Date_Tache_Effectuee).format('DD-MM-YY')}</p></td>
                                             <td><p className="statut_task">{item.Statut}</p></td>
                                             <td><button name = "StartTrack" className="btn_ts_bottom" onClick={setTrackingTime}> Toggl start </button></td>
                                             <td className="last-child"><button name = "Voirplus" className="btn_ts_bottom" value={item.ID_TS} onClick={handleFilter}> D??tails </button></td>
                                        </tr>
                                   )
                              })
                         }
                         <tr><td><button name="addTask" className="add_new_task btn btn_primary" onClick={handleAddTask}>cr??er une nouvelle t??che</button></td></tr>
                         </tbody>
                    </table>
               </Col>
          </Row> : ''}

          {detailTask === true ? <Row className="modal__newTask">
               
               <Col>                                      
                    {filteredTS.map((item,index) => {
                         var day = Moment(item.Date_Tache_Effectuee).format('DD');
                         var Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                         return (  
                              <div id="modal_desktop">                                
                                   <table className="detail_TS" key={index}>
                                        <thead>
                                             <tr>
                                                  <th colspan="2"><p className="date_badge">{day}<br></br>{Month}</p><br></br><p className="title_of_task">{ item.Titre }</p></th>
                                                  <th colspan="2" className="right_tabs--close_modale"><button className="close_modale" onClick={closeTasks}>X</button></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td><p className="bold"><BsIcons.BsPerson/> Assign??</p></td>
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
                    })}
                    
                    <div id="modal_mobile">
                         {filteredTS.map((item,index) => {
                              var day = Moment(item.Date_Tache_Effectuee).format('DD');
                              var Month = Moment(item.Date_Tache_Effectuee).format('MMM');
                              
                              return(
                              
                              <table key={index}>
                                   <thead>
                                        <tr><th><button className="close_modale" onClick={closeTasks}>X</button></th></tr>
                                        <tr>
                                             <th><p className="date_badge">{day}<br></br>{Month}</p></th>
                                             <th><p className="title_of_task">{ item.Titre }</p></th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><label>Assign?? ??</label></td>
                                             <td><p className="bdg_user"> {item.Agent.substring(0,1)}</p></td>
                                        </tr>
                                        <tr>
                                             <td><label>Suivi de temps</label></td>
                                             <td><p className="timeoftask">{ item.Temps_Min_Tache === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                        </tr>

                                        <tr><td colspan="2"><label>Description</label></td></tr>
                                        <tr><td colspan="2"><p className="tasks">{ item.Informations}</p></td></tr>
                                   </tbody>
                              </table>)
                         })}                    
                    </div> 
               </Col> 
          </Row> : ''}
     </Container>

     {newTask === true ? <div className="modal__newTask"><div id="modal_desktop"><button className="close_modale" onClick={closeTasks}>X</button><AdminForm/></div></div> : ''}
     </div>
      )
 }