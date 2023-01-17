import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Entreprise.css';

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

import Button from 'react-bootstrap/Button';
import { Linkv , NavLink } from "react-router-dom";

export default function Entreprise() {

     const [currentNomE, setCurrentNomE] = useState();
     const [currentTVA, setCurrentTVA] = useState();
     const [currentADRESSE, setCurrentADRESSE] = useState();
     const [currentTEL, setCurrentTEL] = useState();
     const [currentEMAILE, setCurrentEMAILE] = useState();
     const [currentSITE, setCurrentSITE] = useState();
     const [currentURLShare, setUrlSHARE] = useState([]);
     const [minEntreprise, setMinEntreprise] = useState();
     const [totminEntreprise,setTotMinEntreprise] = useState();
     const [tempsAlloue, setTempsAlloue] = useState();
     const [validation, setValidation] = useState(false);
     const [allUsers, setAllUsers] = useState([]);

     const [checkPercent, setCheckPercent] = useState();
     const [moneySpend, setMoneySpend] = useState();

     const [currentHeureREST, setCurrentHeureREST] = useState();

     const currentIDE = localStorage.getItem("currentIDE");

     console.log(currentHeureREST);
     
     useEffect(() => {
          let dataE = {currentIDEntreprise: currentIDE};

          const listUser = async () => {
               const response = await fetch('/api/getAllUsers');

               const result = await response.json();
               if(response.status === 200){
                    setAllUsers(result)
                    console.log(allUsers);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          listUser();
          
          const onLoad2 = async () => {

               const response = await fetch('/api/getInfosEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
     
               const data_E = await response.json();
               
               if(response.status === 200){
                    setCurrentNomE(data_E.Nom_societe); 
                    setCurrentTVA(data_E.TVA);
                    setCurrentADRESSE(data_E.Adresse + ' ' + data_E.Code_Postal + ' ' + data_E.Ville);
                    setCurrentTEL(data_E.Telephone);
                    setCurrentEMAILE(data_E.Email);
                    setCurrentSITE(data_E.Site_web);
                    setUrlSHARE(data_E.URL_SharePoint);

                    console.log(currentNomE);
                    console.log(currentTVA);
                    console.log(currentADRESSE);
                    console.log(currentTEL);
                    console.log(currentEMAILE);
                    console.log(currentSITE);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }

               fetch('/api/getHeureEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
               .then(res => res.json())
               .then(json => setMinEntreprise(json[0].minutesEntreprise))
               .catch(err => console.info(err))

               fetch('/api/getTempsAlloue', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
               .then(res => res.json())
               .then(json => setTempsAlloue(json[0].minutesAllouees))
               .catch(err => console.info(err))

               const reponse = await fetch('/api/getTotHeurEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               });

               const data_2 = await reponse.json();

               if(reponse.status === 200){
                    setTotMinEntreprise(data_2[0].totachEntreprise);
                    setCurrentHeureREST(data_2[0].restheEntreprise);

                    const minRes = data_2[0].totachEntreprise - data_2[0].restheEntreprise;

                    setMoneySpend(Math.round(((minRes/60) * 90)));

                    if (parseInt(data_2[0].totachEntreprise) === 0) {
                         const percentage = 0;
                         setCheckPercent(percentage);
                    } else {
                         const percentage = Math.round(((100*data_2[0].restheEntreprise) / data_2[0].totachEntreprise));
                         setCheckPercent(percentage);
                    } 
               }
          }

          onLoad2();

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

     const styleProgress = {
          backgroundColor: '#6610f2!important',
          width: `${checkPercent}%`
     }

     const warningProgress = {
          backgroundColor: '#ff0000',
          width: `${checkPercent}%!important`
     }

     return (
          <div>

               <NavBar />

               <div className="project_sidebar">
                    <div className="tabs_account">
                         <button className="btn noborder" value="profil" /* onClick={handleOnglet} */>Entreprise</button>
                         <NavLink to="/Account"> Mon profil</NavLink>
                    </div>
               </div>

               <Container id="page_entreprise" className="main__content">
                    <h2><BsIcons.BsBuilding/>Entreprise</h2>
                    <Row>
                         <div className="stats_account">
                              <table>
                                   <tr><td colspan="4"><h2>Statistiques</h2></td></tr>          
                                   <tr>
                                        <td>
                                             <p>Achetées : {Math.round(totminEntreprise/60)} h</p>
                                             <p className="highlight">Restantes : {Math.trunc(minEntreprise /60)} h {minEntreprise % 60 } min 
                                                  <br></br> (dont {Math.trunc(tempsAlloue /60)} h {tempsAlloue % 60 } allouées)</p> 
                                        </td>
                                        <td><p><b>Dépensé : {moneySpend} €</b></p></td>                              
                                   </tr>
                                   <tr>
                                        <td colspan="2">
                                             {checkPercent < 10 ?
                                                  <div>
                                                       <div id="progress_bar" style={warningProgress}><p>{checkPercent} %</p></div>
                                                       <Link to ='/Credits'><Button className="recharger">Recharger</Button></Link>
                                                  </div>
                                                  : <div id="progress_bar"  style={styleProgress}><p>{checkPercent} %</p></div>}
                                             
                                        </td>
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
                                                  <td><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue ={currentEMAILE}></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Site: </label></td>
                                                  <td><input type="text" id="web" name="web"  defaultValue ={currentSITE}></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Membres: </label></td>
                                                  <td>
                                                       {allUsers.filter(data => data.ID_entreprise === currentIDE).map((item,index) =>{
                                                       return(<p key={index} className="bdg_user">{item.Prenom.substring(0,1)}</p>)
                                                  })}
                                                  </td>
                                             </tr>

                                             <tr>
                                                  <td><p className="bold">Lien SharePoint : </p></td>
                                                  <td>
                                                       <a href={currentURLShare}>Allez vers mon dossier</a>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td colspan="2"><input type="hidden" id="idE" name="idE" defaultValue ={currentIDE}></input>
                                                  <input type="submit" name="modifier" value="Enregistrer" /></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </form>
                              {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
                              </Col>
                         </Row>          
                    </Container>
               </div>
          )
          }
