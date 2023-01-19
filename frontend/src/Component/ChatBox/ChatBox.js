import React, { useState, useEffect } from 'react';
import MessageList from '../MessageList/MessageList';

export default function ChatBox(){
     const [message, setNewmessage] = useState();
     const [oldMessage, setOldermessage] = useState([]);

     const currentIDU = localStorage.getItem("currentIDU");
     const currentIDE = localStorage.getItem("currentIDE");

     useEffect (() => {
          let dataU = {currentIDU: currentIDU};
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

  return (
    <div>
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
    </div>
  );
}