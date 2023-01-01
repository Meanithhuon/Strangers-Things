import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import {  deletePost } from '../api';

// Unauthenticated Users can see a list of all posts
// All users can filter posts with a simple text matcher  

const Search = ( props ) => {
  const {posts, token} = props
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerm, setFilteredTerm] = useState(posts);

  //if search term matches, return search results.  Otherwise, return posts.
useEffect(() => {

  //  return true if any of the fields you want to check against include the text
  if (searchTerm) {
      
      const searchTerms = searchTerm.toLowerCase().trim().split(' ');
      const filtered = posts.filter((post) => {

        // get the values in the object to filter
          const filterableTerms = [
          post.description, 
          post.title, 
          post.price,
          post.location,
          ];

          //  check the values against the search term  
          for (let value of filterableTerms) {
          const termsLowercase = value.toLowerCase().trim();

          // exclude spaces
            for (let term of searchTerms) {
              if (termsLowercase.length > 0 && term.length > 0 && termsLowercase.includes(term)) {
                return true;
              }
            }
          }
        return false;
      });
      setFilteredTerm(filtered);
    } else {
      setFilteredTerm(posts);
    }
  }, [searchTerm, posts])
  
  async function removePost(token, _id) {
    await deletePost(token, _id).then(()=> {
      window.location.reload();
    })
  }

  return (
    <>
      <div>
      <h1 >POSTS</h1>

      <form onSubmit = {(event)=> {
        event.preventDefault();
        setSearchTerm(searchTerm)
      }}>

      <input className='postSearchBar'
        type='text'
        placeholder='Enter Search Terms'
        onChange = {(event) => setSearchTerm(event.target.value)}
        style={{ width:'300px', height: '30px' }}>
      </input>
      <button className='searchButton' type ='submit'>Search </button>
      </form>
      </div>
      
      <div >
        {filteredTerm.map((post) => {
          const {description, location, price, title, _id, willDeliver, isAuthor } = post;
          return (
            <div key={_id}
            className={post.isAuthor ? 'allPost myPost': 'allPost'}
            >
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              <p>Will Deliver: {willDeliver}</p>
              
              {/* if user isAuthor, allow user option to delete post*/}

              {
                isAuthor ? (
                  <button onClick={(event) => {event.preventDefault(); removePost(token, _id);
                  }}>Delete</button>
                ) : null
              }
                {
                  <Link to={`/posts/${_id}`}>SEE MORE DETAILS</Link>  
                }
              </div>
            )
          })
        }
      </div>
    </>
    )
}

export default Search;