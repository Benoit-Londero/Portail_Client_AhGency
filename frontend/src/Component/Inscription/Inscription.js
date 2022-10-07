import React from 'react';
import { Link } from 'react-router-dom';

import './Inscription.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Inscription() {

    /* const handleSubmit = e => {

        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        
        let inscForm = document.querySelector('form'); //on récupère l'élement <form> et ces différents <input>
        let myInscr = new FormData(inscForm); //que l'on intègre à un formData

        console.log(myInscr);

        fetch(`/api/inscription`, {
            method: 'post',
            body: myInscr
        })
        .then(response => {
            e.target.reset();
        })
        .catch(err => console.info(err));

    } */

    const handleSubmitJson = e => {

        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        
        let inscForm = document.querySelector('form'); //on récupère l'élement <form> et ces différents <input>
        
        const jsonForm = buildJsonFormData(inscForm)

        function buildJsonFormData(inscForm){
            const jsonFormData = {};
            for(const pair of new FormData(inscForm)){
                jsonFormData[pair[0]] = pair[1];
            }

            return jsonFormData;
        }

        fetch('/api/inscription', {
            method: 'post',
            body: jsonForm
        })
        .then( response =>{
            e.target.reset();
        })
        .catch(err =>console.info(err));


    }

  return (
    <div id="page_inscription">
        <Container>
            <Row className="inscription_form">
                <Col lg={12}>
                    <h1>CREER MON COMPTE</h1>
                <form id="inscForm" onSubmit={handleSubmitJson}>
                    <label>Nom<br/>
                        <input type="text" name="nom" placeholder="Doe" required/>
                    </label><br/>
                    <label>Prénom<br/>
                        <input type="text" name="prenom" placeholder="John" required/>
                    </label><br/>
                    <label>Email<br/>
                        <input type="email" name="email" placeholder="johndoe@mail.be" required/>
                    </label><br/>
                    <label>Mot de passe<br/>
                        <input type="password" name="pass" placeholder="*********" required/>
                    </label><br/>
                    <input type="submit" name="inscription" value="M'inscrire" />
                </form>

                <Link to ='/'> Retourner à l'accueil</Link>
                </Col>
               </Row>
        </Container>
        
    </div>
    )
}
