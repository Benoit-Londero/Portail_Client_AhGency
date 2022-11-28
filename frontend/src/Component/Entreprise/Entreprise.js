import React, {useState, useEffect} from 'react'
import NavBar from "../NavBar/NavBar";
import './Entreprise.css'

export default function Entreprise() {

  const currentIDE = (localStorage.getItem("currentIDE").replaceAll('"',''));
  
  const [getInfos, setGetInfos] = useState();

  useEffect(() => {
    let dataU = {currentIDEntreprise: currentIDE};
          
    fetch('/api/getInfosEntreprise', { 
          method: 'POST', 
          body: JSON.stringify(dataU)
    })
    .then(res => res.json())
    .then(json => setGetInfos(json))
    .catch(err => console.info(err))

  }, [currentIDE])
  
  console.log(getInfos);

  return (
    <div>
          <NavBar/>
          <h1>Entreprise</h1>
     </div>
  )
}
