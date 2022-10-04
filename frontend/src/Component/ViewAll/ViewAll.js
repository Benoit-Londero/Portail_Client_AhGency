import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]);
     const [clients, setClients] = useState([]);
     const [filtredtasks, setFiltredtasks] = useState(null);
     
     useEffect (() => {

          fetch('/api/viewall', {method: 'GET'})
               .then(res => res.json())
               .then(json => setAllTasks(json))
               .catch(err => console.info(err))

          fetch('/api/clientviewa', {method: 'GET'})
               .then(res => res.json())
               .then(json => setClients(json))
               .catch(err => console.info(err))
     }, [])

     function filtertask(clients_id){
          let filtredtasks = alltasks.filter(item => item.ID_Client === parseInt(clients_id));
          return filtredtasks;
     }

     function handleTasks(e) {
          let theClient = e.target.value;
          theClient !== "all" 
               ? setFiltredtasks(filtertask(theClient)) 
               : setFiltredtasks(alltasks);
     }

     
     return (
     <div>
     <NavBar />
     <Container id="page_viewall">
          <Row>
               <Col className="resume"><h1>Timesheet</h1></Col>
               <Col></Col>
          </Row>
          <Row>
          <h2>Clients</h2>
               <button  value='all' className="client_list" onClick={handleTasks}>Tous</button>

               {clients && clients.map((item,index) => {
                    return(
                         <button  key={index} value={item.ID} className="client_list" onClick={handleTasks} >{item.Nom} {item.Prenom}</button>
                    ) 
               })}
          </Row>
          <Row className="customer_card_all timesheet">
               <Col>
               
                    <table>
                         <thead>
                              <tr>
                              <td><h2>Timesheet</h2></td>
                              </tr>
                         </thead>
                         <tbody>

                         {filtredtasks && filtredtasks.map((item,index) => {
                         var date = Moment(item.date).format('DD-MM-YYYY');
                         return (
                              <tr key={index}>
                                   <td className='fst_col'><p className="tasks">{ item.informations}</p></td>
                                   <td><p>{date}</p></td>
                                   <td><p>{item.time === '' ? 'en cours' : item.time + ' min'} </p></td>
                                   <td><p className="developer"> {item.developpeur}</p></td>
                              </tr>
                              )
                         })}
                         </tbody>
                    </table>
               </Col>
          </Row>
     </Container>
     </div>
      )
 }
