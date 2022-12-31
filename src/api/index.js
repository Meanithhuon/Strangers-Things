const base = 'https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT'

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

