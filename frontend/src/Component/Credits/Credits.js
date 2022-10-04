import * as React from 'react';
import NavBar from '../NavBar/NavBar.js';

export default function Boutique() {

     const currentUSR = sessionStorage.getItem("currentUSR");
     const currentNOM = sessionStorage.getItem("currentNOM");
     const currentPNOM = sessionStorage.getItem("currentPNOM");
     const currentMAIL = sessionStorage.getItem("currentMAIL");
     const currentHeureTOT = sessionStorage.getItem("currentHeureTOT");
     const currentHeureREST = sessionStorage.getItem("currentHeureREST");
     const currentRole = sessionStorage.getItem("currentRole");

     console.log(currentRole);
     console.log(currentNOM);

     return (
          <div id="page_boutique">
               <NavBar />
               <h1 className="resume">Commander des heures {currentNOM}</h1>

               
               <stripe-pricing-table pricing-table-id="prctbl_1LmYYuKlBZDgS2fNGsBqBD0A"
               publishable-key="pk_test_51JPNMRKlBZDgS2fN3K4QCPMI17QNsbXjNgIRTxSpl6YX01ZvRMGH68W8M2INZUwvdWzIoDGo5uKzmZzN21PSNvYX00jWbaWGea"
               client-reference-id={currentMAIL}>
               </stripe-pricing-table>
         </div>

     )
}