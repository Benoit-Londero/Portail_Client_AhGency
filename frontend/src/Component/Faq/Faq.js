import React from "react";
import './Faq.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import Accordion from 'react-bootstrap/Accordion';
import Call_Center from '../../img/Call_Center.png';

export default function FaqPage() {

     return (
          <div id="page_faq">
               <NavBar />
               <Container>
                    <h1>Foire aux questions</h1>

                    <Row className="header_section">
                         <Col><h2>Répondons à quelques questions !</h2>
                         <img src={Call_Center} alt="call_center" /></Col>
                    </Row>

                    <Row>
                         <Col>
                              <Accordion defaultActiveKey="0">
                                   <Accordion.Item eventKey="0">
                                   <Accordion.Header className="title_accordeon">Que se passe-t'il si je n'ai plus assez de crédit pendant un projet ?</Accordion.Header>
                                   <Accordion.Body>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.</p>
                                   </Accordion.Body>
                                   </Accordion.Item>
                                   <Accordion.Item eventKey="1">
                                   <Accordion.Header>Accordion Item #2</Accordion.Header>
                                   <Accordion.Body>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum.</p>
                                   </Accordion.Body>
                                   </Accordion.Item>
                              </Accordion>
                         </Col>
                    </Row>
               </Container>        
         </div>
     )
}
