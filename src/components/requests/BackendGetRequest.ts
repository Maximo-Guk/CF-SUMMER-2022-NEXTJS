import Post from '../../../types/Post';
import User from '../../../types/User';

// Fetch GET Implementation
async function getData(endpoint: string) {
  // API Endpoint
  const url = 'http://localhost:8787/' + endpoint;
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
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

export async function getUser(userName: string): Promise<User> {
  return await getData('users/' + userName);
}

export async function logoutUser() {
  return await getData('users/user/logout');
}

export async function verifyUser(): Promise<User> {
  return await getData('verify/');
}

export async function getPosts(): Promise<Post[]> {
  return await getData('posts');
}

export async function getPostById(postId: string): Promise<Post> {
  return await getData('posts/' + postId);
}
