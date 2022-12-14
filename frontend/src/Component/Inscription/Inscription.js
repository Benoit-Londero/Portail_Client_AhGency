import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Inscription.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Inscription() {
    //const navigate = useNavigate();

    const [message, setMessage] = useState(false);
    const [error, setError] = useState(false);
    const [errorTVA, setErrorTVA] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        let inscForm = document.getElementById('inscForm'); //on récupère l'élement <form> et ces différents <input>
        let myInscr = new FormData(inscForm); //que l'on intègre à un formData

        const jsonForm = buildJsonFormData(myInscr)

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(myInscr){
            const jsonFormData = {};
            for(const pair of myInscr){
                jsonFormData[pair[0]] = pair[1];
            }

            return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }
        //console.log(jsonForm);

        fetch('https://hook.eu1.make.com/2kri242ac2ssrozcnb44z0zc72j03nck',{
            method: 'POST',
            body: JSON.stringify(jsonForm)
        })

        // fetch('/api/postInscription', { 
        //     method: 'POST',
        //     headers: {'Content-Type':'application/json'},
        //     body: JSON.stringify(jsonForm) 
        // })
        // .then(res => res.json())
        // .then(response=>{})
        // .then(setMessage(true))
        // .catch(err => console.info(err))

        const reception = await fetch('/api/postInscription', { 
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(jsonForm) 
        })
      
        const ress = await reception.json();
        if(ress === "Error"){
            console.log("error reçu");
            setError(true);
        } else if(ress === "ErrorTVA") {
            console.log("error TVA reçu");
            setErrorTVA(true);
        } else {
            console.log('success recu');
            setMessage(true);
        }
    }

  return (
    <div id="page_inscription">
        <Container>
            <Row className="inscription_form">
                {message === false ? <Col lg={12}>
                                        <h1>CREER MON COMPTE</h1>
                                        <form id="inscForm" onSubmit={handleSubmit}>
                                            <label>Nom<br/>
                                                <input type="text" name="nom" placeholder="Doe" required/>
                                            </label><br/>
                                            <label>Prénom<br/>
                                                <input type="text" name="prenom" placeholder="John" required/>
                                            </label><br/>
                                            <label>Email<br/>{error === true ? <span>Un compte existe déjà avec cette adresse email !</span> : null}
                                                <input type="email" name="email" placeholder="johndoe@mail.be" required/>
                                            </label><br/>
                                            <label>Mot de passe<br/>
                                                <input type="password" name="pass" placeholder="*********" required/>
                                            </label><br/>

                                            <label>Les informations de votre entreprise</label>
                                            <label>Nom de votre société<br/>
                                                <input type="text" name="nomEnt" placeholder="Entreprise SPRL, SA Entreprise ...." required/>
                                            </label><br/>
                                            <label>Numéro de TVA<br/>{errorTVA === true ? <span>Ce numéro de TVA existe déjà ! Merci de nous contacter via l'adresse web@ahgency.be</span> : null}
                                                <input type="text" name="tvaNumber" placeholder="BE 0123.456.789" required/>
                                            </label><br/>
                                            <label>Email de l'entreprise<br/>
                                                <input type="email" name="emailEnt" placeholder="johndoe@mail.be" />
                                            </label><br/>
                                            <label>Numéro de téléphone<br/>
                                                <input type="text" name="telEnt" placeholder="0470565656" />
                                            </label><br/>
                                            <label>Adresse du siège<br/>
                                                <input type="text" name="adresseEnt" placeholder="Rue de Saint Andrée 54C, 1000 Bruxelles" />
                                            </label><br/>
                                            <label>URL de votre site web<br/>
                                                <input type="text" name="siteEnt" placeholder="www.ahgency.be" />
                                            </label><br/>
                                            <label>Possédez vous déjà un contrat de maintenance chez nous ? <br/>
                                                <select name="maintenance">
                                                    <option value = "0"> non </option>
                                                    <option value = "1"> oui </option>
                                                </select>
                                            </label><br/>


                                            <input type="submit" name="inscription" value="M'inscrire" />
                                            <input type="hidden" name="objet" id="objet" value="inscription"></input>
                                            <input id="dateCreationEnt" name="dateCreationEnt" value={new Date().toJSON().slice(0, 10)} hidden></input>
                                        </form>

                                        <Link to ='/'> Retourner à l'accueil</Link>
                                    </Col> 
                                  :   <Col lg={12}><div className="thx_message">
                                        <h1>Merci de votre inscription, <br></br>vous pouvez dès à présent vous connecter !!!</h1>
                                        <Link to ='/'> Connexion</Link></div>
                                      </Col>}
            </Row>
        </Container>
        
    </div>
    )
}
