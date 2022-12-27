import React, {useState, useEffect} from "react";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import Entreprise from '../Entreprise/Entreprise.js';

import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";


import { Link } from "react-router-dom";

export default function NameForm() {

     const currentIDU = localStorage.getItem("currentIDU");

     const [validation, setValidation] = useState(false);
     const [error, setError] = useState(false);
     const [currentNOM, setCurrentNOM] = useState();
     const [currentPNOM, setCurrentPNOM] = useState();
     const [currentMAIL, setCurrentMAIL] = useState();

     const [profil, setProfil] = useState(false);

     useEffect(() => {
          let dataU = {currentIDUser: currentIDU};

          const onLoad = async () => {
           
               const response = await fetch('/api/getInfosClient', { 
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify(dataU)
               })
           
               const data = await response.json();
               if(response.status === 200){
                 setCurrentNOM(data.Nom);
                 setCurrentPNOM(data.Prenom);
                 setCurrentMAIL(data.Email);
               } else {
                 alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          onLoad();

     }, [currentIDU])

     const handleClick = async e => {
          e.preventDefault();
          let editForm = document.getElementById('editForm'); //on récupère l'élement <form> et ces différents <input>
          let dataForm = new FormData(editForm); //que l'on intègre à un formData

          const modifPass = dataForm.get("pass");
          const confirmPass = dataForm.get("confpass");

          console.log(modifPass);
          console.log(confirmPass);

          if (modifPass === confirmPass)
          {
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
               setValidation(true);
               setError(false);
          } else {
               setError(true);
               setValidation(false);
          }           
     }

     const handleOnglet = (e) => {
          let onglet = e.target.value;
          if(onglet === "entreprise") {
               setProfil(true);
          } else {
               setProfil(false);
          }
     }

     return (
          <div>
               <NavBar />

               <div className="project_sidebar">
                    <div className="tabs_account">
                         <button value="profil" onClick={handleOnglet}>Mon profil</button>
                         <button value="entreprise" onClick={handleOnglet}>Mon entreprise</button>
                    </div>
               </div>
          
               <Container id="page_account" className="main__content">

                    <div className="tabs_account">
                         <button value="profil" onClick={handleOnglet}>Mon profil</button>
                         <button value="entreprise" onClick={handleOnglet}>Mon entreprise</button>
                    </div>
                    
                    {profil === false ? <div>

                         <Row>
                              <Col className="account_section">
                                   <h2>Mes informations</h2>
                                   
                                   <form id="editForm" onSubmit={handleClick}>
                                   <table className="Profil">
                                        <tbody>
                                             <tr>
                                                  <td><label className="bold"><BsIcons.BsPerson/> Nom : </label> </td>
                                                  <td><input type="text" name="nom" placeholder="Votre nom" defaultValue ={currentNOM} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> <BsIcons.BsFillPersonFill/> Prénom : </label></td>
                                                  <td><input type="text" name="prenom" placeholder="Votre prénom" defaultValue ={currentPNOM} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"><BsIcons.BsBriefcase/> Fonction : </label></td>
                                                  <td><input type="text" name="fonction" placeholder="Directeur, Graphiste,..."></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"><BsIcons.BsAt/> Adresse email : </label></td>
                                                  <td><input type="text" name="email" placeholder="Votre email" defaultValue ={currentMAIL} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Mot de passe : </label></td>
                                                  <td><input type="password" id="pass" name="pass" placeholder="********"></input></td>
                                             </tr>
                                             
                                             {error === true ? <tr><td colspan="3"><span>Les mots de passes ne sont pas identiques !</span></td></tr> : null}

                                             <tr>
                                                  <td><label className="bold"> Confirmation du mot de passe : </label></td>
                                                  <td><input type="password" id="confpass" name="confpass" placeholder="********"></input></td>
                                             </tr>
                                             <tr><td><input type="hidden" name="idu" value ={currentIDU}/></td></tr>
                                             <tr><td colspan="3"><input className="btn primary-btn" type="submit" name="modifier" value="Enregistrer" /></td></tr>
                                        </tbody>
                                   </table>
                                   </form>
                                   {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
                              </Col>
                         </Row>

                         <Row className="mobile">
                              <Col>
                                   <Link path="/Logout"><RiIcons.RiLogoutBoxLine /> Se déconnecter</Link>
                              </Col>
                         </Row>
                              
                    </div> : <Entreprise></Entreprise>}
               </Container>
         </div>
     )
}
