import * as React from 'react';
import NavBar from '../NavBar/NavBar.js';
import './Credits.css';
import illu from '../../img/Brainstorming_session_Monochromatic.png';

export default function Boutique() {


     return (
          <div>
               <NavBar />
               <div className="project_sidebar"></div>

               <div id="page_boutique"  className="main__content">
                    <h1>Commander des heures</h1>

                    <ul>
                         <li class="product_fiche">
                              <h2>Pack 1 heures</h2>
                              <p class="price">75 €</p>

                              <p class="descp">Un pack d'une heure utile pour vos petites modifications tel que des changements de couleur, de texte ou d'image.</p>

                              <a href='https://buy.stripe.com/fZe6qybRLd0L4xy5kk' rel="noopener noreferrer" target="_blank" class="btn primary_btn">Acheter 1 heures</a>         
                         </li>

                         <li class="product_fiche">
                              <h2>Pack 5 heures</h2>
                              <p class='price'>325 €</p>

                              <p class="descp">Vous avez pensé à une nouvelle fonctionnalité pour votre site, ou un besoin d'ajout de contenu, ce pack est fait pour vous.</p>

                              <a href='https://buy.stripe.com/aEU7uCdZT1i35BC8wy' rel="noopener noreferrer" target="_blank" class="btn primary_btn">Acheter 5 heures</a>
                         </li>

                         <li class="product_fiche">
                              <h2>Pack 10 heures</h2>
                              <p class="price">600 €</p>

                              <p class="descp">Envie de faire peau neuve, de procéder à une refonte de votre site ou de tout simplement prévoir un "capital" temps pour vos futures demandes, ce pack répondra à vos attentes.</p>

                              <a href='https://buy.stripe.com/28og183lff8T9RS8wx' rel="noopener noreferrer" target="_blank" class="btn primary_btn">Acheter 10 heures</a>
                         </li>
                    </ul>

                    <div id="catchow">
                         <div class="col-gch">
                              <h2>Toujours pas convaincu ? Ou vous avez la moindre question ?</h2>
                              <p> N'hésitez pas à nous contacter au 02 319 29 20 ou bien à l'adresse <a href='mailto:info@ahgency.be'>info@ahgency.be</a> </p>

                              <a href="https://www.ahgency.be" class="btn primary_btn" rel="noopener noreferrer" target="_blank">Visitez le site</a>
                         </div>
                         <img src={illu} alt='illustration'></img>
                    </div>
               </div>
          </div>
     )
}