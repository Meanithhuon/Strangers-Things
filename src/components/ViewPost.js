import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendMessage } from '../api';

// Function to send a message to the post author
const NewMessage = ({ POST_ID, token, navigate }) => {
  const [message, setMessage] = useState({content: ''});
   
  async function addMessage() {
    await SendMessage({POST_ID , token, message})
  }
  
  return (
    <form onSubmit={ (ev)=> {
      ev.preventDefault();
      addMessage();
    }}>
      <input
        type='text'
        placeholder=''
        onChange={ (ev) => setMessage({content: ev.target.value}) }
      />
      <button type='submit'>ENTER</button>
    </form>
  )
}

const ViewPost = ({ posts, token }) => {
  
  const { POST_ID} = useParams();
  const [currentPost] = posts.filter(post => post._id === POST_ID);
  const {title, description, location, price, willDeliver, isAuthor} = currentPost;
 
  return (
    <>
      <div>
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Location: {location}</p>
        <p>Will Deliver: {willDeliver}</p>
      </div>

      {/* User can send a message only if there is a logged in user and the logged in user is not the one who made post */}
      <button   disabled={!token} >CONTACT THE AUTHOR OF THIS POSTING</button>

 
      {
      !currentPost.isAuthor ? ( <NewMessage POST_ID={POST_ID} token={token}/>) : (null)
      }
    </>
  )
}


export default ViewPost;
