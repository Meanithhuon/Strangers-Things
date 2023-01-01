import React, { useState } from 'react';
import { loginUser } from '../api';

// Unauthenticated user can sign in with correct username/password combination
// Login sets the token on state and in localStorage
// After user login, send user to profile page

const Login = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async () => {
    const results = await loginUser(username, password);
    const token =results.data.token;
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', token);
      navigate('/profile');
    } else {
      console.log(results.error.message)
    }
  }

// Once user registers, user should be able to login 

  return (
     <div>
     <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}>
      <h3>LOGIN</h3>
      {/* input username */}
      <p> You must enter your user name and password (case sensitive).</p>
      <input 
        type='text'
        placeholder='Username'
        onChange={(event) => setUsername(event.target.value)}
      />
      {/* input password */}
      <input 
        type='password'
        placeholder='Password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type='submit'  >Submit</button>
    </form>

    </div>
  )
}

export default Login;