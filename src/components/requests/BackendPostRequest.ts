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
  // 2xx
  if (response.ok) {
    return await response.text();
  } else {
    throw await response.text();
  }
}

export async function createPost(
  title: string,
  content: string,
  username: string,
  photo: string,
) {
  return await postData('posts/', {
    title: title,
    content: content,
    username: username,
    photo: photo,
  });
}

// upvote post, each user can only upvote a post once
export async function upVotePostById(postId: string) {
  return await postData(`posts/${postId}/upvote`, {});
}

// react to post with one of the valid emoji types
// each user can react to post once with every emoji
export async function reactToPostById(postId: string, type: string) {
  return await postData(`posts/${postId}/react`, { type: type });
}

export async function commentOnPostById(postId: string, content: string) {
  return await postData(`posts/${postId}/comments`, { content: content });
}

// upvote comment by commentId and postId, each comment can only be upvoted once by each user
export async function upVoteCommentByIdAndPostId(postId: string, commentId: string) {
  return await postData(`posts/${postId}/comments/${commentId}/upvote`, {});
}

// react to comment by commentId and postId, user can react once with each reaction type
export async function reactToCommentByIdAndPostId(
  postId: string,
  commentId: string,
  type: string,
) {
  return await postData(`posts/${postId}/comments/${commentId}/react`, { type: type });
}
