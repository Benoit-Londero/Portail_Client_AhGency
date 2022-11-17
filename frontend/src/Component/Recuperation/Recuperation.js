import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Recuperation.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Recuperation() {

    const [recupEmail, setRecupEmail] = useState();
    const [messageValidation, setMessageValidation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        console.log(recupEmail);
        let mdpForm = document.getElementById('mdpForm');
        let dataForm = new FormData(mdpForm);

        const jsonForm = buildJsonFormData(dataForm)

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(myInscr){
            const jsonFormData = {};
            for(const pair of myInscr){
                jsonFormData[pair[0]] = pair[1];
            }

            return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }
        

        const response = await fetch('/api/recuperation', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(jsonForm) });
        const reset = await response.json();
        console.log(reset);
        
        if(response.status === 200){
            setMessageValidation(true);
            console.log('je trigger');
            fetch('https://hook.eu1.make.com/2kri242ac2ssrozcnb44z0zc72j03nck', { method: 'POST', body: JSON.stringify({reset: reset, mail : recupEmail, objet: "réinit"})}); 
        }else {
            setMessageValidation(false);
            alert("une erreur est survenue, merci de réessayer plus tard");
        }
    }

    


    const handleChange = (e) => {
        setRecupEmail(e.target.value);
    }


    return (
        <div id="page_recup">
            <Container>
                <Row className="recup_form">
                {messageValidation === false ? <Col lg={12}>
                        <h1>Merci d'entrer votre email !!</h1>
                    <form id="mdpForm" onSubmit={handleSubmit}>
                        <label>Email<br/>
                            <input type="email" name="email" placeholder="Votre email" required onChange={handleChange}/>
                        </label><br/>
                        <input type="submit" name="recuperation" value="Valider" />
                    </form>                
                    </Col> : <Col lg={12}><div className="thx_message">
                            <h1>Votre demande a bien été pris en compte, vous allez recevoir un mail avec votre nouveau mot de passe temporaire !!</h1>
                            <Link to ='/'> Connexion</Link></div>
                    </Col>}
                </Row> 
                <Row className="link">
                    <Col>
                        <Link to ='/'> Retourner à l'accueil</Link>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}
