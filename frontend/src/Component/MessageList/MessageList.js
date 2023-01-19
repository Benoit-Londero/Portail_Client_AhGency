import React from 'react';

function MessageList({ messages }) {
  return (
    <ul>
      {messages.map(message => (
        <li key={message.id}>
          {message.userName} : {message.message}
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
