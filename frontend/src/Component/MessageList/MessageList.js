import React from 'react';

function MessageList({ messages, className }) {
  return (
    <ul className="chat_Window">
      {messages.map(message => (
        <li className={className(message)} key={message.id}>
          <p>{message.ID_client} à envoyé</p>
          <p>{message.Message}</p>
      </li>
      ))}
    </ul>
  );
}

export default MessageList;
