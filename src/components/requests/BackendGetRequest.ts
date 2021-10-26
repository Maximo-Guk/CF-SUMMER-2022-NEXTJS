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
    return await response.json();
  } else {
    throw await response.text();
  }
}

// register user if no user under that username, otherwise return user
export async function getUser(userName: string): Promise<User> {
  return await getData('users/' + userName);
}

// logout user, set cookie to max-age 0
export async function logoutUser() {
  return await getData('users/user/logout');
}

// verify user, return userName as response
export async function verifyUser(): Promise<User> {
  return await getData('verify/');
}

// get all posts
export async function getPosts(): Promise<Post[]> {
  return await getData('posts');
}

export async function getPostById(postId: string): Promise<Post> {
  return await getData('posts/' + postId);
}
