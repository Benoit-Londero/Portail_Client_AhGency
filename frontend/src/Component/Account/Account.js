import React from "react";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImMail4 } from "react-icons/im";


export default function NameForm() {

     const currentNOM = (localStorage.getItem("currentNOM").replaceAll('"',''));
     const currentPNOM = (localStorage.getItem("currentPNOM").replaceAll('"',''));
     const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));
     const currentIDU = localStorage.getItem("currentIDU");

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
     }

     return (
          <div id="page_account">
               <NavBar />
               <Container>
                    <h1>Mon compte</h1>

                    <Row>
                         <Col className="account_section">
                              <h2>Informations générales</h2>
                              
                              <form id="editForm" onSubmit={handleClick}>
                              <table className="Profil">
                                   <tbody>
                                        <tr><td><RiAccountCircleFill className="account_ppic"/></td></tr>
                                        <tr>
                                             <td><label className="bold">Nom : </label> <input type="text" name="nom" placeholder="Votre nom" defaultValue ={currentNOM} required/></td>
                                             <td><label className="bold">Prénom : </label> <input type="text" name="prenom" placeholder="Votre prénom" defaultValue ={currentPNOM} required/></td>
                                        </tr>
                                        <tr><td colspan="2"><label className="bold"> Adresse email : </label><input type="text" name="email" placeholder="Votre email" defaultValue ={currentMAIL} required/></td></tr>
                                        <tr><td colspan="2"><label className="bold"> Mot de passe : </label><input type="password" id="pass" placeholder="********"></input></td></tr>
                                        <tr><td colspan="2"><label className="bold"> Confirmation du mot de passe : </label><input type="password" id="confpass" placeholder="********"></input></td></tr>
                                        <tr><td><input type="hidden" name="idu" value ={currentIDU}/></td></tr>
                                        <tr><td colspan="3"><input type="submit" name="modifier" value="Enregistrer" /></td></tr>
                                   </tbody>
                              </table>
                              </form>
                         </Col>

                         <Col md={{span: 3, offset: 1}} className="my_contact">
                         <h2>Envoyer un mail à</h2>
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
                    </Row>
                    
               </Container>        
         </div>
     )
}
