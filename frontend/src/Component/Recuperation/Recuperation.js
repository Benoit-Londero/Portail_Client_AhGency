import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Recuperation.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function Recuperation() {

    const [recupEmail, setRecupEmail] = useState();

    const handleSubmit = (e) => {
        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        console.log(recupEmail);
        let mdpForm = document.getElementById('mdpForm');
        let dataForm = new FormData(mdpForm);
        

        fetch('/api/recuperation', { method: 'POST', body: dataForm})
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.info(err))
    }

    const handleChange = (e) => {
        setRecupEmail(e.target.value);
    }


    return (
        <div id="page_connexion">
            <Container>
                <Row className="connexion_form">
                    <Col lg={12}>
                        <h1>Merci d'entrer votre email !!</h1>
                    <form id="mdpForm" onSubmit={handleSubmit}>
                        <label>Email<br/>
                            <input type="text" name="email" placeholder="Votre email" required onChange={handleChange}/>
                        </label><br/>
                        <input type="submit" name="recuperation" value="Valider" />
                    </form>                
                    </Col>
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
