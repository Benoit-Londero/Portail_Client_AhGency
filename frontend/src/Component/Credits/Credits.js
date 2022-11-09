import * as React from 'react';
import NavBar from '../NavBar/NavBar.js';
import './Credits.css';
import illu from '../../img/Brainstorming_session_Monochromatic.png';

export default function Boutique() {

     const currentNOM = (localStorage.getItem("currentNOM").replaceAll('"',''));
     //const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));
     const currentRole = (localStorage.getItem("currentRole").replaceAll('"',''));

     console.log(currentRole);
     console.log(currentNOM);

     return (
          <div id="page_boutique">
               <NavBar />
               <h1>Commander des heures</h1>

               
              {/*  <stripe-pricing-table pricing-table-id="prctbl_1LmYYuKlBZDgS2fNGsBqBD0A"
               publishable-key="pk_test_51JPNMRKlBZDgS2fN3K4QCPMI17QNsbXjNgIRTxSpl6YX01ZvRMGH68W8M2INZUwvdWzIoDGo5uKzmZzN21PSNvYX00jWbaWGea"
               client-reference-id={currentMAIL}
               customer-email={currentMAIL}>
               </stripe-pricing-table> */}

               <div  class="product_fiche">
                    <img src='' alt=''></img>
                    <h2>Pack 1 heures</h2>
                    <p class="price">75 €</p>

                    <p class="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus molestias esse? 
                      Voluptatem sed soluta vel cumque, accusantium iusto excepturi praesentium esse? Qui ipsum saepe voluptatibus nobis illo obcaecati. Doloremque.</p>

                    <a href='https://buy.stripe.com/fZe6qybRLd0L4xy5kk' rel="noopener noreferrer" target="_blank" class="button-credits">Acheter 1 heures</a>                    
               </div>

               <div class="product_fiche pdt_highlight">
                    <img src='' alt=''></img>
                    <h2>Pack 5 heures</h2>
                    <p class='price'>325 €</p>

                    <p class="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus molestias esse? 
                       Voluptatem sed soluta vel cumque, accusantium iusto excepturi praesentium esse? Qui ipsum saepe voluptatibus nobis illo obcaecati. Doloremque.</p>

                    <a href='https://buy.stripe.com/aEU7uCdZT1i35BC8wy' rel="noopener noreferrer" target="_blank" class="button-credits">Acheter 5 heures</a>
               </div>
               
               <div class="product_fiche">
                    <img src='' alt=''></img>
                    <h2>Pack 10 heures</h2>
                    <p class="price">600 €</p>

                    <p class="descp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus molestias esse? 
                            Voluptatem sed soluta vel cumque, accusantium iusto excepturi praesentium esse? Qui ipsum saepe voluptatibus nobis illo obcaecati. Doloremque.</p>

                    <a href='https://buy.stripe.com/28og183lff8T9RS8wx' rel="noopener noreferrer" target="_blank" class="button-credits">Acheter 10 heures</a>
               </div>

               <div id="catchow">
                    <div class="col-gch">
                         <h2>Toujours pas convaincu ? Ou vous avez la moindre question ?</h2>
                         <p> N'hésitez pas à nous contacter au 02 319 29 20 ou bien à l'adresse <a href='mailto:info@ahgency.be'>info@ahgency.be</a> </p>

                         <a href="https://www.ahgency.be" class="btn_to_agc" rel="noopener noreferrer" target="_blank">Visitez le site</a>

                    </div>
                    <img src={illu} alt='illustration'></img>
               </div>
         </div>

     )
}