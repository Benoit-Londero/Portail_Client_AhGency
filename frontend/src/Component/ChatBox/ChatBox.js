import React, { useState, useEffect } from 'react';
import MessageList from '../MessageList/MessageList';
import Container from "react-bootstrap/esm/Container";
import NavBar from "../NavBar/NavBar";

import Button from 'react-bootstrap/Button';
import './ChatBox.css'

export default function ChatBox(){
     const [message, setNewmessage] = useState();
     const [oldMessage, setOldermessage] = useState([]);
     const [AllProjet, setAllProjects] = useState([]);
     const [idUser, setCurrentIDE] = useState('');

     const currentIDU = localStorage.getItem("currentIDU");

     useEffect (() => {
          let dataU = {currentIDE: idUser};
          async function fetchMessages() {
               try {
                 const response = await fetch('/api/getMessages', {
                    method: 'POST',
                    body : JSON.stringify(dataU)
                 });
                 const data = await response.json();
                 setOldermessage(data);
               } catch (error) {
                 console.error('Error fetching messages:', error);
               }
          }

          fetch('/api/getAllProjet')
          .then(res => res.json())
          .then(json => setAllProjects(json))
          .catch(err => console.info(err))

          const intervalId = setInterval(fetchMessages, 5000);
          return () => clearInterval(intervalId);
          
     }, [])

     const sendMessage = async (e) => {
          e.preventDefault();

          let newMess = document.getElementById('submitMessage');
          let postMess = new FormData(newMess);

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
             } catch (error) {
               console.error('Error sending message:', error);
          }
     }

     const handleChange = (e) => {
          const pid = e.target.value;
          setCurrentIDE(pid);
     }

  return (
          <div>
               <NavBar />
          
               <div className="project_sidebar">
                    {AllProjet.map((item,index) => {
                         return(
                              <li key={index}><Button className="btn_primary" onClick={handleChange} value={item.ID}>{item.Tickets}</Button></li>
                         )
                    })}
               </div>

               <Container id="page_dashboard"  className="main__content">

                    <MessageList messages={oldMessage} />

                    <form id="submitMessage" onSubmit={sendMessage}>
                         <input
                              type="text"
                              placeholder="Enter your message"
                              value={message}
                              name="mess"
                              onChange={e => setNewmessage(e.target.value)}
                         />
                         <input type="hidden" name="currentIDE" value={currentIDE}></input>
                         <input type="hidden" name="currentIDU" value={currentIDU}></input>
                         <button type="submit">Send</button>
                    </form>
               </Container>
          </div>
  );
}