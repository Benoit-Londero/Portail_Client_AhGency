import React, {useState, useEffect} from "react";
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImMail4 } from "react-icons/im";


export default function NameForm() {

     const currentIDU = localStorage.getItem("currentIDU");

     const [validation, setValidation] = useState(false);
     const [error, setError] = useState(false);
     const [currentNOM, setCurrentNOM] = useState();
     const [currentPNOM, setCurrentPNOM] = useState();
     const [currentMAIL, setCurrentMAIL] = useState();

     const [currentNomE, setCurrentNomE] = useState();
     const [currentTVA, setCurrentTVA] = useState();
     const [currentADRESSE, setCurrentADRESSE] = useState();
     const [currentTEL, setCurrentTEL] = useState();
     const [currentEMAILE, setCurrentEMAILE] = useState();
     const [currentSITE, setCurrentSITE] = useState();
     const [currentMAINTENANCE, setCurrentMAINTENANCE] = useState();

     const [displayEntreprise, seCurrentEntreprise] = useState();

     const currentIDE = (localStorage.getItem("currentIDE").replaceAll('"',''));

     const [users, setAllUsers] = useState();

     useEffect(() => {
          let dataU = {currentIDUser: currentIDU};
          let dataE = {currentIDEntreprise: currentIDE};


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

               const resp = await fetch('/api/getInfosEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })

               const data_entr = await resp.json();
                    if(response.status === 200){
                         setCurrentNomE(data_entr.Nom_societe); 
                         setCurrentTVA(data_entr.TVA);
                         setCurrentADRESSE(data_entr.Adresse);
                         setCurrentTEL(data_entr.Telephone);
                         setCurrentEMAILE(data_entr.Email);
                         setCurrentSITE(data_entr.Site_web);
                         setCurrentMAINTENANCE(data_entr.Maintenance);
                    } else {
                         
                    }
               
               fetch('/api/getUsers')
                    .then(resp => resp.json())
                    .then(json => setAllUsers(json))
                    .catch(err => console.info(err))
          }

          onLoad();

     }, [currentIDU, currentIDE])
      

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
          
          setDisplayEntreprise(true); 
     }

     return (
          <div id="page_account">
               <NavBar />
               <Container>
                    <ul>
                         <li><h1>Mon compte</h1></li>
                         <li><button onClick={handleClick}>Entreprise</button></li>
                    </ul>
                    
                   {displayEntreprise === false ? 
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
                                        <tr><td colspan="2"><label className="bold"> Mot de passe : </label><input type="password" id="pass" name="pass" placeholder="********"></input></td></tr>
                                        {error === true ? <tr><td colspan="3"><span>Les mots de passes ne sont pas identiques !</span></td></tr> : null}
                                        <tr><td colspan="2"><label className="bold"> Confirmation du mot de passe : </label><input type="password" id="confpass" name="confpass" placeholder="********"></input></td></tr>
                                        <tr><td><input type="hidden" name="idu" value ={currentIDU}/></td></tr>
                                        <tr><td colspan="3"><input type="submit" name="modifier" value="Enregistrer" /></td></tr>
                                   </tbody>
                              </table>
                              </form>
                              {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
                         </Col>

                         <Col md={{span: 3, offset: 1}} className="my_contact">
                         <h2>Envoyer un mail à</h2>
                              <ul>
                                   {users.filter(item => item.Role === 'administrator').map((item,index) => {
                                        return (
                                             <li key={index}>
                                                  <table>
                                                       <tbody>
                                                            <tr>
                                                            <td>{item.Nom}<br/><span  className="mail">{item.Email }</span></td>
                                                            <td><a href={"mailto:" + item.Email }><ImMail4 className="btn_mail"/></a></td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                             </li>
                                        )
                                   })}
                              </ul>
                         </Col>
                    </Row>

                   : 
                         <Row>
                              <Col>
                              <form id="editForm" onSubmit={handleClick}>
                                   <table className="Profil">
                                        <tbody>
                                             <tr>
                                                  <td><label className="bold">Nom : </label> <input type="text" name="nom" placeholder="Nom de l'entreprise" defaultValue ={currentNomE} required/></td>
                                                  <td><label className="bold">Numéro de TVA: </label> <input type="text" name="tva" placeholder="BE123456789" defaultValue ={currentTVA} required/></td>
                                             </tr>
                                             <tr><td colspan="2"><label className="bold"> Adresse : </label><input type="text" name="adresse" placeholder="Votre adresse" defaultValue ={currentADRESSE} required/></td></tr>
                                             <tr><td colspan="2"><label className="bold"> Téléphone : </label><input type="tel" id="telephone" name="telephone" placeholder="01/234.567" defaultValue ={currentTEL}></input></td></tr>

                                             <tr><td colspab="2"><label className="bold"> Email : </label><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td></tr>
                                             <tr><td colspab="2"><label className="bold"> Site : </label><input type="text" id="web" name="web"  defaultValue= {currentSITE}></input></td></tr>
                                             <tr><td colspab="2"><label className="bold"> Email : </label><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td></tr>
                                             
                                             <tr><td colspan="3"><input type="submit" name="modifier" value="Enregistrer" /></td></tr>
                                        </tbody>
                                   </table>
                              </form>

                              <p>Maintenance : { currentMAINTENANCE === 1 ? "Contrat de maintenance OK" : "Contrat de maintenance NOK"}</p>

                              <form>
                                   <label>Ajouter des membres à mon entreprise </label>
                                   <select>
                                        {
                                        users.map((item,index) => {
                                             return(
                                                  <option key={index} value={item}>{item}</option>
                                             )
                                        })
                                        }
                                   </select>
                              </form>
                              </Col>

                         </Row>
                   } 
                    
                    
               </Container>        
         </div>
     )
}
