import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './index.css';
import {
  Navbar,
  Profile,
  Home,
  Register,
  Login,
  MakeNewPost,
  ViewPost,
  Posts
} from './components';

import {
  getPosts,
  getUser
} from './api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // once user logs in, user should be able to logout
  // logout clears the token from the state and from localStorage  
  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }
  

  //get posts
  async function fetchPosts() {
    const results = await getPosts(token)
    setPosts(results.data.posts);
  }
  
  
  async function handleUser() {
    const storedToken = window.localStorage.getItem('token');
    
    if (!token) {
      if (storedToken) {
        setToken(storedToken);
      }
      return;
    }
    //get token 
    
    const results = await getUser(token)
    if (results.success) {
      setUser(results.data);
    } else {
      console.log(results.error.message);
    }
  }
  //get user data
  
  useEffect(() => {
    fetchPosts();
  }, [token])
  
  useEffect(() => {
    handleUser();
  }, [token])
  
  return (
    <div id = 'main'>
      <Navbar logout={ logout } token={ token }/>
      <Routes>
        <Route 
          path='/' 
          element={
          <Home
          />} 
        />
        <Route 
          path='/posts' 
          element={
            <Posts posts={posts}
            token={ token }
            />} 
        />
        <Route
          exact path='/posts/post'
          element={
            <MakeNewPost 
            token={ token } 
            fetchPosts={ fetchPosts } 
            navigate={ navigate }
          />}
        />
       <Route
          path='/posts/:POST_ID'
          element={
          <ViewPost
          posts={ posts }
          token={ token }
          navigate={ navigate }
          />}
        />
        <Route 
          path='/profile' 
          element={
          <Profile 
          user={ user }
          />} 
        />
        <Route 
          path='/register' 
          element={
          <Register 
          setToken={ setToken } 
          token={token} 
          navigate={navigate} 
          />} 
        />
        <Route
          path='/login'
          element={ 
          <Login 
          setToken={ setToken }
          navigate={ navigate }
          />}
        />
      </Routes>
    </div>
  )
}
export default App