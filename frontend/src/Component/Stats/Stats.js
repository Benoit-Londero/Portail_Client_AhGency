import React, {useState,useEffect} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import './Stats.css';

export default function Stats(){

     const [currentHeureTOT, setCurrentHeureTOT] = useState();
     const [currentHeureREST, setCurrentHeureREST] = useState();
     const [moneySpend, setMoneySpend] = useState();
     const [checkPercent, setCheckPercent] = useState();

     const currentIDU = localStorage.getItem("currentIDU");

     let dataU = {currentIDUser: currentIDU};

     useEffect(() => {
          const onLoad = async () => {
               
               const response = await fetch('/api/getInfosClient', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataU)
               })
               
               const data = await response.json();
          
               if(response.status === 200){
                    setCurrentHeureTOT(data[0].Minutes_Achetees);
                    setCurrentHeureREST(data[0].Minutes_Restantes);

                    //Calcul temps restants (On soustrait le temps dépensé au temps total)
                    const timeSpend = data[0].Minutes_Achetees - data[0].Minutes_Restantes;

                    //Calcul du montant dépensé (temps dépensé)
                    setMoneySpend(Math.round(((timeSpend/60) * 75)));

                    if (parseInt(data[0].Minutes_Achetees) === 0) {
                         const percentage = 0;
                         setCheckPercent(percentage);
                    } else {
                         const percentage = Math.round(((100*data.Minutes_Restantes) / data.Minutes_Achetees));
                         setCheckPercent(percentage);
                    }
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          onLoad();
     },[currentIDU]);

     return (
          <div className="stats">
               <h2>Statistiques</h2>
                                      
               {checkPercent > 10 ? <CircularProgressbar
                    value={checkPercent}
                    text={`${checkPercent}%`}
                    styles={{
                         path: {
                              strokeLinecap: 'round',
                              transition: 'stroke-dashoffset 0.5s ease 0s',
                              stroke: '#3FB58F'
                         },
                         // Customize the circle behind the path, i.e. the "total progress"
                         trail: {
                              stroke: '#e7e7e7',
                              strokeLinecap: 'round'
                         },
                              
                         text: {
                              transform: 'translate(-20px, 5px)',
                              fontSize: '15px',
                              fill: '#fff'
                         }
               
                    }}
               /> : <CircularProgressbar
                    value={checkPercent}
                    text={`${checkPercent}%`}
                    styles={{
                    path: {
                         strokeLinecap: 'round',
                         transition: 'stroke-dashoffset 0.5s ease 0s',
                         stroke: '#FF0000'
                    },
                    
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                         stroke: '#e7e7e7',
                         strokeLinecap: 'round'
                    },
                         
                    text: {
                         transform: 'translate(-20px, 5px)',
                         fontSize: '15px',
                         fill: '#FF0000'
                    }
               }}
               />}
                    
               <p>Achetées : {Math.round(currentHeureTOT /60)} h</p>
               <p>Restantes : {Math.trunc(currentHeureREST /60)} h {currentHeureREST % 60 } min</p><br/>
               <p><b>Dépensé : {moneySpend} €</b></p>
               {checkPercent > 10 ? null : <Link to ='/Credits'><Button className="recharger">Recharger</Button></Link>}
          </div>
     )
}