// Fetch DELETE Implementation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function deleteData(endpoint: string, data: any) {
  // API Endpoint
  const url = 'https://ga-api.maximoguk.workers.dev/' + endpoint;
  const response = await fetch(url, {
    method: 'DELETE',
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
    throw await response.text();
  }
}

export async function removePostById(postId: string) {
  return await deleteData('posts/' + postId, {});
}

export async function removeUpVoteByPostId(postId: string) {
  return await deleteData(`posts/${postId}/upvote`, {});
}

export async function removeReactionByPostId(postId: string, type: string) {
  return await deleteData(`posts/${postId}/react`, { type: type });
}

export async function removeCommentByIdAndPostId(postId: string, commentId: string) {
  return await deleteData(`posts/${postId}/comments/${commentId}`, {});
}

export async function removeCommentUpvoteByIdAndPostId(
  postId: string,
  commentId: string,
) {
  return await deleteData(`posts/${postId}/comments/${commentId}/upvote`, {});
}

export async function removeCommentReactionByIdAndPostId(
  postId: string,
  commentId: string,
  type: string,
) {
  return await deleteData(`posts/${postId}/comments/${commentId}/react`, { type: type });
}
