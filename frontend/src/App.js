import React, {useState} from "react";
import './App.css';
import Connexion from './Component/Connexion/Connexion.js'
import Deconnexion from './Component/Deconnexion/Deconnexion.js'

import Boutique from './Component/Credits/Credits.js'
import NameForm from './Component/Account/Account.js'
import Home from './Component/Home/Home.js'
import Facture from './Component/Facture/Facture.js'
import Inscription from './Component/Inscription/Inscription.js'
import AdminForm from './Component/AdminForm/AdminForm.js'
import AdminHeure from './Component/AdminHeures/AdminHeure.js'
import ViewAll from './Component/ViewAll/ViewAll.js'

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [erreur, setErreur] = useState(false);
  const [login, setLogin] = useState(false);

  const [idU, setIdU] = useState();
  const [usr, setUsr] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [heureTotal, setHeureTotal] = useState();
  const [heureRest, setHeureRest] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();

  sessionStorage.setItem("currentIDU",idU);
  sessionStorage.setItem("currentUSR",usr);
  sessionStorage.setItem("currentNOM", nom);
  sessionStorage.setItem("currentPNOM", prenom);
  sessionStorage.setItem("currentMAIL", email);
  sessionStorage.setItem("currentHeureTOT", heureTotal);
  sessionStorage.setItem("currentHeureREST", heureRest);
  sessionStorage.setItem("currentRole", role);
  sessionStorage.setItem("currentToken", token);

  const handleSubmit = e => {
    e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
    let logForm = document.getElementById('logForm'); //on récupère l'élement <form> et ces différents <input>
    let myform = new FormData(logForm); //que l'on intègre à un formData

    fetch('/api/form', { method: 'POST', body: myform })

    .then(res => res.json())
    .then(json => {if(json.length === 1) {
      setIdU(json[0].ID);
      setUsr(json[0].Login); 
      setNom(json[0].Nom); 
      setPrenom(json[0].Prenom);
      setEmail(json[0].email);
      setHeureTotal(json[0].heures_totales); 
      setHeureRest(json[0].heures_restantes);
      setRole(json[0].Role);
      setToken(json[1].token);
      setErreur(false);
      setLogin(true);

    }
    else {
        setErreur(true)
    }})
    .catch(err => console.info(err))
  }

  
  const resetLogin = () => {
    setLogin(false);
    setIdU('');
    setUsr(''); 
    setNom(''); 
    setPrenom('');
    setEmail('');
    setHeureTotal(''); 
    setHeureRest('');
    setRole('');
    setErreur(false);
  }

  return (
    <div className="App">
      <header className="App-header">            
        <Router>
            <Routes>
              <Route exact path="/" element={<Connexion handleSubmit={handleSubmit} erreur={erreur} login={login}/>}></Route>
              <Route path="/Home" element={< Home />}></Route>
              <Route path="/AdminForm" element={< AdminForm />}></Route>
              <Route path="/AdminHeure" element={< AdminHeure />}></Route>
              <Route path="/ViewAll" element={< ViewAll />}></Route>
              <Route path='/Account' element={< NameForm />}></Route>
              <Route path='/Credits' element={< Boutique />}></Route>
              <Route path='/Factures' element={< Facture />}></Route>
              <Route path='/Inscription' element={< Inscription />}></Route>
              <Route path='/Logout' element={< Deconnexion resetLogin={resetLogin}/>}></Route>
            </Routes>
        </Router>
      </header>
    </div>
  );
  
}

export default App;


