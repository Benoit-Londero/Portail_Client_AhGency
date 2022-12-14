import React, {useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Connexion.css';
//import { useLocalStorage } from '../../useLocalStorage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import logo from '../../img/logo_ahgency.png';

import {HiArrowNarrowLeft} from 'react-icons/hi';

export default function Connexion(props) {

    const navigate = useNavigate();
    const handleSubmit = props.handleSubmit;
    const erreur = props.erreur;
    const login = props.login;


    useEffect(() => {
        if (login === true )
        {
            navigate('/Home')
        }
    }, [login, navigate])
    

  return (
    <div id="page_connexion">
        
        <Container>
            <Row className="connexion_form">
                <Col lg={12}>
                    <img src={logo} class="logo_ahgency" alt="Logo_AhGency"></img>
                {erreur === true ? <Alert variant="danger">Email ou mot de passe érroné</Alert> : null }
                <form id="logForm" onSubmit={handleSubmit}>
                    <label>Adresse email<br/>
                        <input type="mail" name="email" placeholder="Votre email" required/>
                    </label><br/>
                    <label>Mot de passe<br/>
                        <input type="password" name="pwd" placeholder="Votre mot de passe" required/><br></br>
                        <Link to ='/Recuperation'> Mot de passe oublié</Link>
                    </label><br/>
                    <input type="submit" name="Connexion" value="se connecter" />
                </form>

                
                </Col>

                <Col lg={12}><Link to ='/Inscription'> Créer un compte</Link></Col>
            </Row>
            <Row className="link">
                <Col>
                <a href="https://www.ahgency.be" rel="noopener noreferrer" target="_blank"><HiArrowNarrowLeft/> AhGency.be</a>
                </Col>
            </Row>
        </Container>
        
    </div>
  )
}
