import React, {useState, useEffect} from "react";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import { ImMail4 } from "react-icons/im";
import Entreprise from '../Entreprise/Entreprise.js';


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
          
          // fetch('/api/getInfosClient', { 
          //           method: 'POST', 
          //           body: JSON.stringify(dataU)
          // })
          // .then(res => res.json())
          // .then(json => setGetInfos(json))
          // .catch(err => console.info(err))

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
          <div id="page_account">
               <NavBar />
               <div className="tabs_account">
                    <button value="profil" onClick={handleOnglet}>Mon profil</button>
                    <button value="entreprise" onClick={handleOnglet}>Mon entreprise</button>
               </div>
               
               {profil === false ? <Container>

                    <Row>
                         <Col className="account_section">
                              <h2>Mes informations</h2>
                              
                              <form id="editForm" onSubmit={handleClick}>
                              <table className="Profil">
                                   <tbody>
                                        <tr>
                                             <td><label className="bold">Nom : </label> <input type="text" name="nom" placeholder="Votre nom" defaultValue ={currentNOM} required/></td>
                                             <td><label className="bold">Prénom : </label> <input type="text" name="prenom" placeholder="Votre prénom" defaultValue ={currentPNOM} required/></td>
                                        </tr>
                                        <tr><td colspan="2"><label className="bold"> Adresse email : </label><input type="text" name="email" placeholder="Votre email" defaultValue ={currentMAIL} required/></td></tr>
                                        <tr><td colspan="2"><label className="bold"> Mot de passe : </label><input type="password" id="pass" name="pass" placeholder="********"></input></td></tr>
                                        {error === true ? <tr><td colspan="3"><span>Les mots de passes ne sont pas identiques !</span></td></tr> : null}
                                        <tr><td colspan="2"><label className="bold"> Confirmation du mot de passe : </label><input type="password" id="confpass" name="confpass" placeholder="********"></input></td></tr>
                                        <tr><td><input type="hidden" name="idu" value ={currentIDU}/></td></tr>
                                        <tr><td colspan="3"><input className="btn primary-btn" type="submit" name="modifier" value="Enregistrer" /></td></tr>
                                   </tbody>
                              </table>
                              </form>
                              {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
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
                    
               </Container> : <Entreprise></Entreprise>}
         </div>
     )
}
