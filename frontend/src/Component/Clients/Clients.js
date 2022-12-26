import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";

import AjoutClient from '../AjoutClient/AjoutClient.js';

import Button from 'react-bootstrap/Button';

export default function Clients() {

     const [addClient, setAddClient] = useState(false);

     const [showDetails, setShowDetails] = useState(false);
     const [idDetailClient, setIdDetailClient] = useState('');

     const [showEntreprise, setShowEntreprise] = useState(false);

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
          .catch(err => console.info(err))

          fetch('/api/getProjet', { 
               method: 'POST', 
               body: JSON.stringify(dataE)
          })
          .then(res => res.json())
          .catch(err => console.info(err))
          
     }, [currentIDU, currentIDE])

     /* AJOUT BENOIT - DECEMBRE 2022 */

     const handleAddClient = (e) =>{
          setAddClient(true);
     }

     const closeTasks = (e) => {
          setAddClient(false);
     }

     const handleEntreprise = (e) => {
          let onglet = e.target.value;
          if(onglet === "entreprise"){
               setShowEntreprise(true)
          } else {
               setShowEntreprise(false);
          }
          
     }

     const handleShowClient = async (e) => {
          setShowDetails(true);
          let id_client = {currentIDUser: e.target.value};
          setIdDetailClient(id_client);

          const response = await fetch('/api/getInfosClient', { 
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(id_client)
          })
          
          const data = await response.json();
          console.log(data)

          console.log(idDetailClient)
     }

     return (

     <div>
     <NavBar />
     
     <div className="project_sidebar">
          <h2>CRM</h2>

          <ul>
               <li><Button value="clients" onClick={handleEntreprise}>Clients</Button></li>
               <li><Button value="entreprise" onClick={handleEntreprise}>Entreprise</Button></li>
               <li><Button className="sidebar_btn" onClick={handleAddClient}>+</Button></li>
          </ul>
     </div>

     <Container id="page_dashboard"  className="main__content">

          <Row>
               {showEntreprise === false ?
                    <Col className="tbl" id="TblClients">
                         <h2>Clients</h2>
                         <table>
                              <thead>
                                   <th><p>Nom</p></th>
                                   <th><p>Entreprise</p></th>
                                   <th><p>Projets</p></th>
                                   <th><p>Créé</p></th>
                              </thead>
                              <tbody>
                                   <tr onClick={handleShowClient} value="55">
                                        <td><p>Vicky Allard</p></td>
                                        <td><p>Greenkids</p></td>
                                        <td><p>4</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                                   <tr onClick={handleShowClient} value="56">
                                        <td><p>Vicky Allard</p></td>
                                        <td><p>Greenkids</p></td>
                                        <td><p>4</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                                   <tr onClick={handleShowClient} value="54">
                                        <td><p>Vicky Allard</p></td>
                                        <td><p>Greenkids</p></td>
                                        <td><p>4</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                                   <tr onClick={handleShowClient} value="53">
                                        <td><p>Vicky Allard</p></td>
                                        <td><p>Greenkids</p></td>
                                        <td><p>4</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                              </tbody>
                         </table>
                    </Col> 

               :    
                    <Col className="tbl" id="TblClients">
                         <h2>Entreprise</h2>
                         <table>
                              <thead>
                                   <th><p>Nom de l'entreprise</p></th>
                                   <th><p>Membres</p></th>
                                   <th><p>Projets</p></th>
                                   <th><p>Créé</p></th>
                              </thead>
                              <tbody>
                                   <tr onClick={handleShowClient} value="3">
                                        <td><p>Greenkids</p></td>
                                        <td>
                                             <p className="bdg_user">V</p>
                                             <p className="bdg_user">S</p>
                                             <p className="bdg_user">J</p>
                                        </td>
                                        <td><p>20</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                                   <tr onClick={handleShowClient} value="4">
                                        <td><p>Et si on créait</p></td>
                                        <td>
                                             <p className="bdg_user">A</p>
                                        </td>
                                        <td><p>2</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                                   <tr onClick={handleShowClient} value="5">
                                        <td><p>CFE Tax Adviser Europe</p></td>
                                        <td>
                                             <p className="bdg_user">K</p>
                                             <p className="bdg_user">A</p>
                                             <p className="bdg_user">B</p>
                                        </td>
                                        <td><p>1</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>
                              </tbody>
                         </table>
                    </Col> 
          }

          </Row>

          {addClient === true ? <Row className="modal__newTask">
               
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <AjoutClient/>
                    </div>  
          </Row> : ''}

          {showDetails === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <h2>Détails Client</h2>
                    </div>  
               </Row>
          : ''}
     </Container>
     </div>
      )
 }