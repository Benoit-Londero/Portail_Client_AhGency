import React from 'react';

const render = (message) => {
  const currentIDU = localStorage.getItem("currentIDU");
  
  if(message.ID_client === currentIDU){
    return(
      <li className='sendByMe' key={message.id}>
        <p>{message.ID_client} à envoyé</p>
        <p>{message.Message}</p>
      </li>
    )
  } else {
    return(
      <li className='sendToMe' key={message.id}>
        <p>{message.ID_client} à envoyé</p>
        <p>{message.Message}</p>
      </li>
    )
  }
}

function MessageList({ messages }) {
  return (
    <ul>
      {messages.map(message => (
        {render}
      ))}
    </ul>
  );
}

export default MessageList;
