import React, { useState } from "react";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImMail4 } from "react-icons/im";
import * as BiIcons from "react-icons/bi";
import Accordion from 'react-bootstrap/Accordion';


export default function NameForm() {

     const [edit, setEdit] = useState(false);

     const currentNOM = (localStorage.getItem("currentNOM").replaceAll('"',''));
     const currentPNOM = (localStorage.getItem("currentPNOM").replaceAll('"',''));
     const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));
     const currentIDU = localStorage.getItem("currentIDU");

     const identity= {
          nom : currentNOM,
          prenom : currentPNOM,
          mail: currentMAIL
     }

     const contact_agc = [
          {
               nom : 'Quentin de Jarnac',
               mail : 'quentin@ahgency.be'
          },
          {
               nom : 'Fabian Hernandez',
               mail : 'fabian@ahgency.be'
          },
          {
               nom : 'Benoit Londero',
               mail : 'benoit@ahgency.be'
          }
     ]

     const handleClick = async () => {
          if(edit === false)
          {
               setEdit(true);
          }
          else {
               let editForm = document.getElementById('editForm'); //on récupère l'élement <form> et ces différents <input>
               let dataForm = new FormData(editForm); //que l'on intègre à un formData

               const conJSON = buildJsonFormData(dataForm);

               //On crée une boucle pour transformer le FormData en JSON
               function buildJsonFormData(dataForm){
                    const jsonFormData = {};
                    for(const pair of dataForm){
                         jsonFormData[pair[0]] = pair[1];
                    }

                    return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
               }

               const response = await fetch('/api/editUserInfo', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', "Accept": "*/*"},
                    body: JSON.stringify(conJSON)
               })

               const data = await response.json();
               console.log(data);

               setEdit(false);
          }
          
     }

     return (
          <div id="page_account">
               <NavBar />
               <Container>

                    <h1 className="resume">Mon compte</h1>

                    <Row className="account_section">
                         {edit === false ? <Col md={8}>
                         <h2>Informations générales</h2>
                         <table className="Profil">
                              <tbody>
                                   <tr><td><RiAccountCircleFill className="account_ppic"/></td></tr>
                                   <tr><td><p className="bold">Nom : {identity.nom}</p></td></tr>
                                   <tr><td><p className="bold">Prénom : {identity.prenom}</p></td></tr>
                                   <tr><td><p className="bold">Mail : {identity.mail}</p></td></tr>
                                   {/* <tr>
                                        <td><label for="pass">Modifier mon mot de passe</label><br/>
                                        <input type="password" id="pass" placeholder="********"></input></td>
                                   </tr>

                                   <tr>
                                        <td><label for="confpass">Confirmer nouveau mot de passe</label><br/>
                                        <input type="password" id="confpass" placeholder="********"></input></td>
                                   </tr> */}

                                   <tr>
                                        <td><button onClick={handleClick}><BiIcons.BiPencil /></button></td>
                                        <span className="clear"></span>
                                   </tr>
                              </tbody>
                         </table>
                         
                         
                         </Col> : <Col md={8}>
                              <span className="avertissement">La modification de vos informations de profil ne sera visible qu'après une reconnexion !!</span>
                              <form id="editForm" onSubmit={handleClick}>
                                   <label>Nom<br/>
                                   <input type="text" name="nom" placeholder="Votre nom" defaultValue ={currentNOM} required/>
                                   </label><br/>
                                   <label>Prénom<br/>
                                   <input type="text" name="prenom" placeholder="Votre prénom" defaultValue ={currentPNOM} required/>
                                   </label><br/>
                                   <label>Email<br/>
                                   <input type="text" name="email" placeholder="Votre email" defaultValue ={currentMAIL} required/>
                                   <input type="number" name="idu" value ={currentIDU} hidden/>
                                   </label><br/>
                                   <input type="submit" name="modifier" value="Enregistrer" />
                         </form></Col> }

                         <Col md={{span: 3, offset: 1}} className="my_contact">
                         <h2>Mes contacts</h2>
                              <ul>
                                   {contact_agc.map((item,index) => {
                                        return (
                                             <li key={index}>
                                                  <table>
                                                       <tbody>
                                                            <tr>
                                                            <td>{item.nom}<br/><span  className="mail">{item.mail }</span></td>
                                                            <td><a href={"mailto:" + item.mail }><ImMail4 className="btn_mail"/></a></td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                             </li>
                                        )
                                   })}
                              </ul>
                         </Col>

                    {/* <Row className="account_section delete_account">
                         <Col lg={12}>
                         <table >
                              <tbody>
                                   <tr>
                                        <td><label for="deleteacc">Supprimer mon compte (ATTENTION !! Cette action est irréversible)</label></td>
                                        <td><input type="submit" id="deleteacc" value="Supprimer mon compte"/></td>
                                   </tr>                                
                              </tbody>
                         </table>

                         </Col>
                    </Row> */}
                         <Col>
                              <h2>FAQ</h2>
                              <Accordion defaultActiveKey="0">
                                   <Accordion.Item eventKey="0">
                                   <Accordion.Header className="title_accordeon">Que se passe-t'il si je n'ai plus assez de crédit pendant un projet ?</Accordion.Header>
                                   <Accordion.Body>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.</p>
                                   </Accordion.Body>
                                   </Accordion.Item>
                                   <Accordion.Item eventKey="1">
                                   <Accordion.Header>Accordion Item #2</Accordion.Header>
                                   <Accordion.Body>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.</p>
                                   </Accordion.Body>
                                   </Accordion.Item>
                              </Accordion>
                         </Col>
                    </Row>
               </Container>        
         </div>
     )
}
