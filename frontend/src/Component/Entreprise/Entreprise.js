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
    <div>
          <NavBar/>
          <h1>Entreprise</h1>

          Nom : {currentNomE}
          TVA : {currentTVA}
          Adresse : {currentADRESSE}
          Téléphone : {currentTEL}
          Email : {currentEMAILE}
          Site : {currentSITE}
          Maintenance : { currentMAINTENANCE === 1 ? "Contrat de maintenance OK" : "Contrat de maintenance NOK"}
     </div>
  )
}
