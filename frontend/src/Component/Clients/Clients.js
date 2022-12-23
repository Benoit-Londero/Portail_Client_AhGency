import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";

import AjoutClient from '../AjoutClient/AjoutClient.js';
import AdminForm from "../AdminForm/AdminForm.js";

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function Home() {

     const [newTask, setnewTask] = useState(false);
     const [detailClient, setdetailTask] = useState(false);

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

     /* AJOUT BENOIT - DECEMBRE 2022 */

     const handleShowClient = (e) =>{
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
          <h2>CRM</h2>

          <ul>
               <li><h3>Clients</h3></li>
               <li><h3>Entreprise</h3></li>
          </ul>

          <Link to ='/Projet'><Button className="sidebar_btn">+</Button></Link>
     </div>

     <Container id="page_dashboard"  className="main__content">

          <Row>
               <Col className="tbl" id="TblClients">
                    <h2>Clients</h2>
                    <table>
                         <thead>
                              <th>Nom</th>
                              <th>Entreprise</th>
                              <th>Projets</th>
                              <th>Créé</th>
                         </thead>
                         <tbody>
                              <tr onClick={handleShowClient}>
                                   <td>Vicky Allard</td>
                                   <td>Greenkids</td>
                                   <td>4</td>
                                   <td>20.12.2022</td>
                              </tr>
                              <tr>
                                   <td>Vicky Allard</td>
                                   <td>Greenkids</td>
                                   <td>4</td>
                                   <td>20.12.2022</td>
                              </tr>
                              <tr>
                                   <td>Vicky Allard</td>
                                   <td>Greenkids</td>
                                   <td>4</td>
                                   <td>20.12.2022</td>
                              </tr>
                              <tr>
                                   <td>Vicky Allard</td>
                                   <td>Greenkids</td>
                                   <td>4</td>
                                   <td>20.12.2022</td>
                              </tr>
                         </tbody>
                    </table>
               </Col>

          </Row>

          {detailClient === true ? <Row className="modal__newTask">
               
               <Col>                                      
                   <AjoutClient/>
               </Col> 
          </Row> : ''}
     </Container>

     {newTask === true ? <div className="modal__newTask"><button className="close_modale" onClick={closeTasks}>X</button><AdminForm/></div> : ''}
     </div>
      )
 }