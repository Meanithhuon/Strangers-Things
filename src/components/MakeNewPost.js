import React from 'react';
import { addNewPost } from '../api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const MakeNewPost = ({ token, fetchPosts, navigate }) => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [Price, setPrice] = useState('');
  const [WillDeliver, setWillDeliver] = useState(false);
  const { POST_ID } = useParams();
  
  async function addPost() {
  const makePost = {
      token: token,
      title: Title,
      description: Description,
      price: Price,
      location: Location,
      willDeliver: WillDeliver,
      _id: POST_ID 
    }
    const results = await addNewPost(token, makePost)
    fetchPosts();
    navigate(`/posts`)
  }
  
//   Form for users to make new listings

  return (
    <form onSubmit={ (event) => {
      event.preventDefault();
      addPost();
      
    }}>
      {/* input title, description, location, price */}
      <input 
        type='text'
        value={Title}
        placeholder='Item'
        onChange={(event) => setTitle(event.target.value)}
      />
      <input 
        type='text'
        value={Description}
        placeholder='Description of Item'
        onChange={(event) => setDescription(event.target.value)}
      />
      <input 
        type='text'
        value={Location}
        placeholder='Location of Item'
        onChange={(event) => setLocation(event.target.value)}
      />
      <input 
        type='text'
        value={Price}
        placeholder='Price of Item'
        onChange={(event) => setPrice(event.target.value)}
      />
      {/* check box if will deliver */}
      <input 
        type='checkbox'
        checked={WillDeliver}
        onChange={(event) => setWillDeliver(!WillDeliver)}
      />
      <span>Check the box if you will deliver the item.</span>
      <p> You must be registered and logged in to post.</p>
      <p>  After you are logged in, you must enter the item, description, location, and price.  Then press "Enter".</p>
      <button type='submit'>ENTER</button>
    </form>
  )
}

export default MakeNewPost;