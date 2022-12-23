import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Entreprise.css';

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

/* import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"; */

export default function Entreprise() {

  const currentIDE = localStorage.getItem("currentIDE");
  
  const [currentNomE, setCurrentNomE] = useState();
  const [currentTVA, setCurrentTVA] = useState();
  const [currentADRESSE, setCurrentADRESSE] = useState();
  const [currentTEL, setCurrentTEL] = useState();
  const [currentEMAILE, setCurrentEMAILE] = useState();
  const [currentSITE, setCurrentSITE] = useState();
  const [currentMAINTENANCE, setCurrentMAINTENANCE] = useState();
  const [minEntreprise, setMinEntreprise] = useState();
  const [tempsAlloue, setTempsAlloue] = useState();
  const [validation, setValidation] = useState(false);

  useEffect(() => {
     let dataU = {currentIDEntreprise: currentIDE};
          
     const onLoad = async () => {
               
          const response = await fetch('/api/getInfosEntreprise', { 
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(dataU)
          })
     
          const data = await response.json();
          if(response.status === 200){
               setCurrentNomE(data.Nom_societe); 
               setCurrentTVA(data.TVA);
               setCurrentADRESSE(data.Adresse);
               setCurrentTEL(data.Telephone);
               setCurrentEMAILE(data.Email);
               setCurrentSITE(data.Site_web);
               setCurrentMAINTENANCE(data.Maintenance);
          } else {
               alert('Erreur du serveur, veuillez réessayer plus tard');
          }

          fetch('/api/getHeureEntreprise', { 
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(dataU)
          })
          .then(res => res.json())
          .then(json => setMinEntreprise(json[0].minutesEntreprise))
          .catch(err => console.info(err))

          fetch('/api/getTempsAlloue', { 
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(dataU)
          })
          .then(res => res.json())
          .then(json => setTempsAlloue(json[0].minutesAllouees))
          .catch(err => console.info(err))
     }

    onLoad();

  }, [currentIDE])

  const handleClick = async e => {
     e.preventDefault();
     let editForm = document.getElementById('editForm'); //on récupère l'élement <form> et ces différents <input>
     let dataForm = new FormData(editForm); //que l'on intègre à un formData

     const formJSON = buildJsonFormData(dataForm);

     //On crée une boucle pour transformer le FormData en JSON
     function buildJsonFormData(dataForm){
          const jsonFormData = {};
          
          for(const pair of dataForm){
               jsonFormData[pair[0]] = pair[1];
          }
          return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
     }

     const response = await fetch('/api/editEntInfo', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formJSON)
     })

     const ress = await response.json();
     if(response.status === 200)
     {
          console.log(ress);
          setValidation(true);
     }
  }      

  return (
    <div id="page_entreprise">
          <Container>
               <h2><BsIcons.BsBuilding/>Entreprise</h2>
               <Row>
                    <div className="stats_account">
                         <table>
                              <tr><td colspan="4"><h2>Statistiques</h2></td></tr>
                              
                              <tr>
                                   <td>
                                        <p>Achetées : {/* {Math.round(currentHeureTOT /60)} */}50 h</p>
                                        <p className="highlight">Restantes : {Math.trunc(minEntreprise /60)} h {minEntreprise % 60 } min  (dont {Math.trunc(tempsAlloue /60)} h {tempsAlloue % 60 } allouées)</p> 
                                   </td>
                                   <td><p><b>Dépensé : {/* {moneySpend} */}300 €</b></p></td>
                                   {/* {checkPercent > 10 ? null : <Link to ='/Credits'><Button className="recharger">Recharger</Button></Link>} */}
                              </tr>
                              <tr>
                                   <td colspan="2"><div id="progress_bar"><p>100%</p></div></td>
                              </tr>
                         </table>
                    </div>
               </Row>
               <Row>    
                    <Col>
                    <form id="editForm" onSubmit={handleClick}>
                         <table className="Profil">
                              <tbody>
                                   <tr>
                                        <td><label className="bold">Nom: </label></td>
                                        <td><input type="text" name="nom" placeholder="Nom de l'entreprise" defaultValue ={currentNomE} required/></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"> Numéro de TVA: </label></td>
                                        <td><input type="text" name="tva" placeholder="BE123456789" defaultValue ={currentTVA} required/></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"> Adresse: </label></td>
                                        <td><input type="text" name="adresse" placeholder="Votre adresse" defaultValue ={currentADRESSE} required/></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"><BsIcons.BsFillTelephoneFill/> Téléphone: </label></td>
                                        <td><input type="tel" id="telephone" name="telephone" placeholder="01/234.567" defaultValue ={currentTEL}></input></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"><MdIcons.MdAlternateEmail/> Email: </label></td>
                                        <td><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"> Site: </label></td>
                                        <td><input type="text" id="web" name="web"  defaultValue= {currentSITE}></input></td>
                                   </tr>
                                   <tr>
                                        <td><label className="bold"> Membres: </label></td>
                                        <td>
                                             <p className="bdg_user">F</p>
                                             <p className="bdg_user">Q</p>
                                             <p className="bdg_user">B</p>
                                        </td>
                                   </tr>
                                   <tr>
                                        <td colspan="2"><input type="hidden" id="idE" name="idE" defaultValue= {currentIDE}></input>
                                        <input type="submit" name="modifier" value="Enregistrer" /></td>
                                   </tr>
                              </tbody>
                         </table>
                    </form>
                    {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
                    {/* <p>Maintenance : { currentMAINTENANCE === 1 ? "Contrat de maintenance OK" : "Contrat de maintenance NOK"}</p> */}
                    </Col>
               </Row>          
          </Container>
     </div>
  )
}
