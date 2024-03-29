import React, { useRef, useState, useEffect} from 'react';
import MessageList from '../MessageList/MessageList';
import Container from "react-bootstrap/esm/Container";
import NavBar from "../NavBar/NavBar";
import { FiSend } from "react-icons/fi";

import Button from 'react-bootstrap/Button';
import './ChatBox.css';

export default function ChatBox(){
     const [message, setNewmessage] = useState();
     const [oldMessage, setOldermessage] = useState([]);
     const [AllProjet, setAllProjects] = useState([]);
     const [idEntreprise, setCurrentIDE] = useState(null);

     const [badgeCount, setBadgeCount] = useState(0);

     const currentIDU = localStorage.getItem("currentIDU");
     const currentRole = localStorage.getItem("currentRole");
     const IDE = localStorage.getItem("currentIDE");

     const messagesEndRef = useRef(null); // Permet le scroll jusqu'au bas de la discussion
     /** Ajout badge notification **/

     const lastMessageSeen = localStorage.getItem("lastMessageSeen") || '';

     /** Fin badge notification **/

     /**
      * Add sound effect
      */
     const sendMessageSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/24/audio_2c68c4317a.mp3?filename=high-pitched-bamboo-swish-101368.mp3');
     const newMessageSound = new Audio('https://cdn.pixabay.com/download/audio/2022/10/30/audio_6634b0add4.mp3?filename=click-124467.mp3');

     const fetchMessages = async () => {
          try {
            const response = await fetch('/api/getMessages', {
               method: 'POST',
               body : JSON.stringify({currentIDE: idEntreprise, currentIDU})
            });
            const data = await response.json();
            setOldermessage(data);

            if( data.length > 0){
               const newestMessage = data[data.length - 1];
               if (newestMessage.Message !== lastMessageSeen){
                    localStorage.setItem('lastMessageSeen', newestMessage.Message);
                    localStorage.setItem('idLastMessageSeen', idEntreprise);
                    newMessageSound.play();

                    console.log(badgeCount);
                    
                    setBadgeCount(1)
                    console.log(badgeCount);
               }
            }
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
     }
     
     useEffect(() => {
          fetch('/api/getAllProjet')
          .then(res => res.json())
          .then(json => setAllProjects(json))
          .catch(err => console.info(err))

          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });

          const timeoutId = setTimeout(fetchMessages, 5000);
          return () => clearTimeout(timeoutId);
     })

     const sendMessage = async (e) => {
          e.preventDefault();
          
          let newMess = document.getElementById('submitMessage'); //on récupère l'élement <form> et ces différents <input>
          let postMess = new FormData(newMess); //que l'on intègre à un formData

          const jsonForm = buildJsonFormData(postMess);

          function buildJsonFormData(postMess){
            const jsonFormData = {};
            for(const pair of postMess){
                jsonFormData[pair[0]] = pair[1];
            }
            return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
          }

          try {
               const response = await fetch('/api/postMessage', {
                 method: 'POST',
                 body: JSON.stringify(jsonForm),
                 headers: { 'Content-Type': 'application/json' },
               });
               const data = await response.json();
               console.log('Message sent successfully:', data);
               sendMessageSound.play();

               fetchMessages();


             } catch (error) {
               console.error('Error sending message:', error);
          }
     }

     const handleChange = (e) => {
          const pid = e.target.value;
          console.log(pid);

          setCurrentIDE(pid);
          setOldermessage([]);

          fetchMessages();
     }

     return (
          <div>
               <NavBar />
          
               <div className="project_sidebar">
                    <ul>
                    {currentRole === '"administrator"'
                         ? AllProjet.map((item,index) => {
                              return(
                                   <li key={index}>
                                        <Button className="primary_btn" onClick={handleChange} value={item.ID}>{item.Tickets}</Button>
                                        {parseInt(badgeCount) !== 0 ? <span className="bdg_count">{badgeCount}</span> : ''}
                                   </li>
                              )
                         })
                         : AllProjet.filter(donnee => donnee.ID_entreprise === parseInt(IDE)).map((item,index) => {
                              return(
                                   <li key={index}>
                                        <Button className="primary_btn" onClick={handleChange} value={item.ID}>{item.Tickets}</Button>
                                        {parseInt(badgeCount) !== 0 ? <span className="bdg_count">{badgeCount}</span> : ''}
                                   </li>
                              )
                    })
                    }</ul>
               </div>

               <Container id="page_chatbox"  className="main__content">

                    <div className="chat_Window">
                         <MessageList messages={oldMessage} className={(message) => message.ID_client === parseInt(currentIDU) ? 'sender' : 'receiver'} />
                         <div ref={messagesEndRef} />
                    </div>
                    <form id="submitMessage" onSubmit={sendMessage}>
                         <table>
                              <tr>
                                   <td className="input_field"><textarea
                                        placeholder="Entrer votre message"
                                        value={message}
                                        id="new_message"
                                        className="input_newMess"
                                        name="mess"
                                        onChange={e => setNewmessage(e.target.value)}>
                                        </textarea>
                                        
                                        <input type="hidden" name="currentIDE" value={idEntreprise}></input>
                                        <input type="hidden" name="currentIDU" value={currentIDU}></input>
                                   </td>
                                   <td className="submit_mess">
                                        <button type="submit"><FiSend/></button>
                                   </td>
                              </tr>
                         </table>
                    </form>
               </Container>
          </div>
          
     );
}