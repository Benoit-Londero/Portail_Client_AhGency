import React, { useState, useEffect, useRef } from 'react';
import MessageList from '../MessageList/MessageList';
import Container from "react-bootstrap/esm/Container";
import NavBar from "../NavBar/NavBar";

import Button from 'react-bootstrap/Button';
import './ChatBox.css'

export default function ChatBox(){
     const [message, setNewmessage] = useState();
     const [oldMessage, setOldermessage] = useState([]);
     const [AllProjet, setAllProjects] = useState([]);
     const [idEntreprise, setCurrentIDE] = useState();
     const [timeoutId, setTimeoutId] = useState();
     const formRef = useRef(null);

     console.log(timeoutId);

     const currentIDU = localStorage.getItem("currentIDU");

     async function fetchMessages() {
          try {
            const response = await fetch('/api/getMessages', {
               method: 'POST',
               body : JSON.stringify({currentIDU: idEntreprise})
            });
            const data = await response.json();
            setOldermessage(prevMessages => [...prevMessages, ...data]);
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
     }

     useEffect (() => {

          fetch('/api/getAllProjet')
          .then(res => res.json())
          .then(json => setAllProjects(json))
          .catch(err => console.info(err))

          const timeoutId = setTimeout(fetchMessages, 5000);
          setTimeoutId(timeoutId);
          return () => clearTimeout(timeoutId);
          
     }, [])

     const sendMessage = async (e) => {
          e.preventDefault();

          let postMess = new FormData(formRef.current);

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
               fetchMessages();
             } catch (error) {
               console.error('Error sending message:', error);
          }
     }

     const handleChange = (e) => {
          const pid = e.target.value;
          console.log(pid);
          setCurrentIDE(pid);
          fetchMessages()
     }

  return (
          <div>
               <NavBar />
          
               <div className="project_sidebar">
                    {AllProjet.map((item,index) => {
                         return(
                              <li key={index}><Button className="primary_btn" onClick={handleChange} value={item.ID}>{item.Tickets}</Button></li>
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
                         <input type="hidden" name="currentIDE" value={idEntreprise}></input>
                         <input type="hidden" name="currentIDU" value={currentIDU}></input>
                         <button type="submit">envoyer mon message</button>
                    </form>
               </Container>
          </div>
  );
}