const base = 'https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT'

// A request to the endpoint to fetch an array of post objects

export const getPosts = async(token) => {
  try {
    const response = await fetch(`${base}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const results = await response.json();
    return results;
  } catch(error) {
    console.log('error')
  }
}

// This route is used to create a new user account

export const register = async (username, password) => {
  try {
    const response = await fetch(`${base}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
    const result = await response.json();
    return result;
  } catch(error) {
    console.log('error')
  }
}

// This route is used for a user to login when they already have an account

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${base}/users/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password
        }
      })
    })
    
    const result = await response.json();
    
    return result;
    
  } catch(ex) {
    console.log('error')
  }
}

// This route is used to grab an already logged in user’s relevant data

export const getUser= async (token) => {
  try {
    const response = await fetch(`${base}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    
    const result = await response.json();
    return result;
    
  } catch(error) {
    console.log('error')
  }
}

// A request to the endpoint to create a new post with a valid token  

export const addNewPost= async (token, {title, description, price, location, willDeliver})=> {
  try {
    const response = await fetch(`${base}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver
        }
      })
    })
    
    const result = await response.json();
    return result;
  } catch(error) {
    console.log('error')
  }
}

// A request to the endpoint to delete a post whose _id is equal to POST_ID with a valid token

export const deletePost = async (token, _id)=> {
  try {
    console.log(token, _id)
    const response = await fetch(`${base}/posts/${[_id]}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    
    const result = await response.json();
    return result;
  } catch(error) {
    console.log('error')
  }
}

// A request to the endpoint to create a new message for a post whose _id is equal to POST_ID with a valid token

export const SendMessage = async ({POST_ID, token, message}) => {
  try {
    const response = await fetch(`${base}/posts/${POST_ID}/messages`, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({
      message
     })
    })
  } catch(error) {
    console.log('error')
  }
}

