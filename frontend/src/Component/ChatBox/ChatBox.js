import React, { useState, useEffect } from 'react';
import MessageList from '../MessageList/MessageList';

export default function ChatBox(){
     const [message, setNewmessage] = useState();
     const [oldMessage, setOldermessage] = useState([]);

     const currentIDU = localStorage.getItem("currentIDU");

     useEffect (() => {
          async function fetchMessages() {
               try {
                 const response = await fetch('/api/getMessages', {
                    method: 'POST',
                    body : JSON.stringify(currentIDU)
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
          try {
               const response = await fetch('/api/postMessage', {
                 method: 'POST',
                 body: JSON.stringify({ message }),
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

      <form onSubmit={sendMessage}>
         <input
           type="text"
           placeholder="Enter your message"
           value={message}
           onChange={e => setNewmessage(e.target.value)}
         />
         <button type="submit">Send</button>
       </form>
    </div>
  );
}