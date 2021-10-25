// Fetch POST Implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function postData(endpoint: string, data: any) {
  // API Endpoint
  const url = 'https://ga-api.maximoguk.workers.dev/' + endpoint;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'strict-origin',
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw response.text();
  }
}

export async function createPost(title: string, content: string, photo?: string) {
  return await postData('posts/', {
    title: title,
    content: content,
    photo: photo,
  });
}

export async function upVotePostById(postId: string) {
  return await postData(`posts/${postId}/upvote`, {});
}

export async function reactToPostById(postId: string, type: string) {
  return await postData(`posts/${postId}/react`, { type: type });
}

export async function commentOnPostById(postId: string, content: string) {
  return await postData(`posts/${postId}/comments`, { content: content });
}

export async function upVoteCommentByIdAndPostId(postId: string, commentId: string) {
  return await postData(`posts/${postId}/comments/${commentId}/upvote`, {});
}

export async function reactToCommentByIdAndPostId(
  postId: string,
  commentId: string,
  type: string,
) {
  return await postData(`posts/${postId}/comments/${commentId}/react`, { type: type });
}
