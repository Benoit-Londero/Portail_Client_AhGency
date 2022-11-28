import React, {useState, useEffect} from 'react'
import NavBar from "../NavBar/NavBar";
import './Entreprise.css'

export default function Entreprise() {

  const currentIDE = (localStorage.getItem("currentIDE").replaceAll('"',''));
  
  const [currentNomE, setCurrentNomE] = useState();
  const [currentTVA, setCurrentTVA] = useState();
  const [currentADRESSE, setCurrentADRESSE] = useState();
  const [currentTEL, setCurrentTEL] = useState();
  const [currentEMAILE, setCurrentEMAILE] = useState();
  const [currentSITE, setCurrentSITE] = useState();
  const [currentMAINTENANCE, setCurrentMAINTENANCE] = useState();


  const users = ['fabian','Benoit','Quentin'];

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
    }

    onLoad();

  }, [currentIDE])

  return (
    <div id="page_entreprise">
          <NavBar/>
          <Container>
               <h1>Entreprise</h1>
               <Row>
                    <form id="editForm" onSubmit={handleClick}>
                         <table className="Profil">
                              <tbody>
                                   <tr><td><RiAccountCircleFill className="account_ppic"/></td></tr>
                                   <tr>
                                        <td><label className="bold">Nom : </label> <input type="text" name="nom" placeholder="Nom de l'entreprise" defaultValue ={currentNomE} required/></td>
                                        <td><label className="bold">Numéro de TVA: </label> <input type="text" name="tva" placeholder="BE123456789" defaultValue ={currentTVA} required/></td>
                                   </tr>
                                   <tr><td colspan="2"><label className="bold"> Adresse : </label><input type="text" name="adresse" placeholder="Votre adresse" defaultValue ={currentADRESSE} required/></td></tr>
                                   <tr><td colspan="2"><label className="bold"> Téléphone : </label><input type="tel" id="telephone" name="telephone" placeholder="01/234.567" defaultValue ={currentTEL}></input></td></tr>

                                   <tr><td colspab="2"><label className="bold"> Email : </label><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td></tr>
                                   <tr><td colspab="2"><label className="bold"> Site : </label><input type="text" id="web" name="web"  defaultValue= {currentSITE}></input></td></tr>
                                   <tr><td colspab="2"><label className="bold"> Email : </label><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td></tr>
                                   
                                   <tr><td><input type="hidden" name="idu" value ={currentIDU}/></td></tr>
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

               </Row>

          
          </Container>
     </div>
  )
}
