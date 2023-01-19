import React from 'react';

function MessageList({ messages }) {
  return (
    <ul>
      {messages.map(message => (
        <li key={message.id}>
          <div>
          {message.ID_client} à envoyé :
          </div> : {message.Message}
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
