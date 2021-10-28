import Post from '../../../types/Post';
import User from '../../../types/User';

// Fetch GET Implementation
async function getData(endpoint: string) {
  // API Endpoint
  const url = 'https://ga-api.maximoguk.workers.dev/' + endpoint;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'strict-origin',
  });
  // 2xx
  if (response.ok) {
    return response;
  } else {
    throw await response.text();
  }
}

// register user if no user under that username, otherwise return user
export async function getUser(userName: string): Promise<User> {
  return await (await getData('users/' + userName)).json();
}

// logout user, set cookie to max-age 0
export async function logoutUser(): Promise<string> {
  return await (await getData('users/user/logout')).text();
}

// verify user, return userName as response
export async function verifyUser(): Promise<string> {
  return await (await getData('verify/')).text();
}

// get all posts
export async function getPosts(): Promise<Post[]> {
  return await (await getData('posts')).json();
}

export async function getPostById(postId: string): Promise<Post> {
  return await (await getData('posts/' + postId)).json();
}
