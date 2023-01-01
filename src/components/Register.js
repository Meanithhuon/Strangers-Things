import React, { useState } from 'react';
import { register } from '../api';

// Unauthenticated Users can sign up for an account with username and password
const Register = ({ setToken, navigate }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
//  Store token on state and in localStorage to save it for automatically logging in the user upon the next app load
// After user registers, send user to login page

  const handleSubmit = async () => {
    const results = await register(username, password);
    const token =results.data.token;
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', token);
      navigate('/login');
    } else {
      console.log(results.error.message)
    }
  }
  
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>
      <h3>REGISTER</h3>
      <p> You must register a user name and password (case sensitive).</p>
      <input 
        type='text'
        placeholder='Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input 
      className="spacing"
        type='password'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit' className="spacing" >Submit</button>
    </form>
  )
}

export default Register;