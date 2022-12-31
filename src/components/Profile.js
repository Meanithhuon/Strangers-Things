import React from 'react';

const Profile = ({ user}) => {
  const messages = user.messages;
  const userID = user._id;
  
  return (
    <div>
      {user._id ? <h2>Welcome  {user.username}</h2>: null}
      <p>  You must be registered and logged in to read and send messages.</p>
        <div>
        <h2 className = 'messagesReceived allPost'>Your Messages:</h2>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const {username} = message.fromUser
            const {title} = message.post;
            
            if (userID !== fromUserID) {
              return (
                <div key={message._id}>
                  <p>From User: {username} </p>
                  <p>Re: {title}</p>
                  <p>Message: {message.content}</p>
                </div>
              )
            }
          })    
        }
      </div>
      <div>
      <h2 className='messagesSent allPost'> Messages That You Sent:
      <br></br>
      <p>(You must refresh your browser to see messages that you sent.)</p>
      </h2>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const {title} = message.post;

            if (userID === fromUserID) {
              return (
                <div key={message._id}>
                <p>Re: {title}</p>
                <p>Message: {message.content}</p>
                </div>
              )
            }
          })    
        }
      </div>
    </div>
  )
}

export default Profile;