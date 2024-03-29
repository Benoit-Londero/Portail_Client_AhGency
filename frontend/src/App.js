import React, {useState} from "react";

import Connexion from './Component/Connexion/Connexion.js';
import Deconnexion from './Component/Deconnexion/Deconnexion.js';
import Boutique from './Component/Credits/Credits.js';
import NameForm from './Component/Account/Account.js';
import Clients from './Component/Clients/Clients.js';
import Home from './Component/Home/Home.js';
import Inscription from './Component/Inscription/Inscription.js';
import Projet from './Component/Projet/Projet.js';
import AdminForm from './Component/AdminForm/AdminForm.js';
import AdminHeure from './Component/AdminHeures/AdminHeure.js';
import Recuperation from './Component/Recuperation/Recuperation.js';
import ViewAll from './Component/ViewAll/ViewAll.js';
import Entreprise from './Component/Entreprise/Entreprise.js';
import ChatBox from './Component/ChatBox/ChatBox.js';
import Report from './Component/Report/Report.js';

import './App.css';

import useLocalStorage from "./useLocalStorage";

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [erreur, setErreur] = useState(false);
  const [login, setLogin] = useState(false);
  
  /* eslint-disable no-unused-vars */
  const [currentIDU, setCurrentIDU] = useLocalStorage("currentIDU","");
  const [currentIDE, setCurrentIDE] = useLocalStorage("currentIDE","");
  const [currentUSR, setCurrentUSR] = useLocalStorage("currentUSR","");
  const [currentNOM, setCurrentNOM] = useLocalStorage("currentNOM","");
  const [currentPNOM, setCurrentPNOM] = useLocalStorage("currentPNOM","");
  const [currentMAIL, setCurrentMAIL] = useLocalStorage("currentMAIL","");
  const [currentHeureTOT, setCurrentHeureTOT] = useLocalStorage("currentHeureTOT","");
  const [currentHeureREST, setCurrentHeureREST] = useLocalStorage("currentHeureREST","");
  const [currentRole, setCurrentRole] = useLocalStorage("currentRole","");
  const [currentToken, setCurrentToken] = useLocalStorage("currentToken","");
  /* eslint-disable no-unused-vars */

  const handleSubmit = async e => {

    e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés

    let logForm = document.getElementById('logForm'); //on récupère l'élement <form> et ces différents <input>
    let myform = new FormData(logForm); //que l'on intègre à un formData

    const conJSON = buildJsonFormData(myform);

    //On crée une boucle pour transformer le FormData en JSON
    function buildJsonFormData(myform){
      const jsonFormData = {};
      for(const pair of myform){
          jsonFormData[pair[0]] = pair[1];
      }

      return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
    }

    const response = await fetch('/api/postConnect', { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', "Accept": "*/*"},
      body: JSON.stringify(conJSON)
    })

    const data = await response.json();
    if(response.status === 200){
      setCurrentIDU(data.ID);
      setCurrentIDE(data.ID_entreprise);
      setCurrentUSR(data.Login); 
      setCurrentNOM(data.Nom);
      setCurrentPNOM(data.Prenom);
      setCurrentMAIL(data.Email);
      setCurrentHeureTOT(data.Minutes_Achetees); 
      setCurrentHeureREST(data.Minutes_Restantes);
      setCurrentRole(data.Role);
      setErreur(false);
      setLogin(true);

    } else {
      setErreur(true);
      console.log('erreur');
    }
  }

  const resetLogin = () => {
    setLogin(false);
    setCurrentIDU('');
    setCurrentIDE('');
    setCurrentUSR(''); 
    setCurrentNOM(''); 
    setCurrentPNOM('');
    setCurrentMAIL('');
    setCurrentHeureREST(''); 
    setCurrentHeureREST('');
    setCurrentRole('');
    setErreur(false);
  }

  return (
    <div className="App">
      <header className="App-header">            
        <Router>
            <Routes>
              <Route exact path="/" element={<Connexion handleSubmit={handleSubmit} erreur={erreur} login={login}/>}></Route>
              <Route path="/Projet" element={< Projet />}></Route>
              <Route path="/Home" element={< Home />}></Route>
              <Route path="/AdminForm" element={< AdminForm />}></Route>
              <Route path="/AdminHeure" element={< AdminHeure />}></Route>
              <Route path="/ViewAll" element={< ViewAll />}></Route>
              <Route path="/ChatBox" element={< ChatBox />}></Route>
              <Route path='/Account' element={< NameForm />}></Route>
              <Route path="/Clients" element={< Clients/>}></Route>
              <Route path="/Entreprise" element={< Entreprise />}></Route>
              <Route path="/Recuperation" element={< Recuperation />}></Route>
              <Route path="/Projet" element={< Projet />}></Route>
              <Route path='/Credits' element={< Boutique />}></Route>
              <Route path='/Inscription' element={< Inscription />}></Route>
              <Route path='/Logout' element={< Deconnexion resetLogin={resetLogin}/>}></Route>
              <Route path="/Report" element={< Report />}></Route>
            </Routes>
        </Router>
      </header>
    </div>
  ) 
}

export default App;