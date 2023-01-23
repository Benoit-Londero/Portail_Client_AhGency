import React, {useEffect, useState} from 'react';

const [nameUser, setnameUser] = useState();

useEffect(() => {
  fetch('/api/getAllUsers')
  .then(response => response.json())
  .then(json => setnameUser(json))
  .catch(error => console.info(err))

}, [])

function MessageList({ messages, className }) {
  return (
    <ul>
      {messages.map(message => (
        <li className={className(message)} key={message.id}>
          <p>{nameUser.filter(donnee => donnee.ID === message.ID_client).map((item,index) => {
            return(<span className='bdg_user'>{item.Prenom.substring(0,1)}</span> + ' ' + item.Prenom)
          })} à envoyé</p>
          <p className='contentMessage'>{message.Message}</p>
      </li>
      ))}
    </ul>
  );
}

export default MessageList;
