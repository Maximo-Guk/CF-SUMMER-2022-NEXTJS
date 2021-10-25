import * as React from 'react';
import { AuthContext } from '../context/AuthProvider';
import { DateTime } from 'luxon';
import Linkify from 'linkify-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getPosts } from '../components/requests/BackendGetRequest';
import Post from '../../types/Post';
import {
  reactToCommentByIdAndPostId,
  reactToPostById,
  upVoteCommentByIdAndPostId,
  upVotePostById,
} from '../components/requests/BackendPostRequest';
import {
  removeCommentByIdAndPostId,
  removeCommentReactionByIdAndPostId,
  removeCommentUpvoteByIdAndPostId,
  removePostById,
  removeReactionByPostId,
  removeUpVoteByPostId,
} from '../components/requests/BackendDeleteRequest';
import PostReactions from './PostReactions';
import CommentReactions from './CommentReactions';
import DeletePostMenu from './DeletePostMenu';
import DeleteCommentMenu from './DeleteCommentMenu';

export default function PostList() {
  const { user } = React.useContext(AuthContext);
  const [posts, setPosts] = React.useState([] as Post[]);

  React.useEffect(() => {
    getHomeFeed();
  }, []);

  async function getHomeFeed() {
    try {
      setPosts(await getPosts());
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePostUpvote(postId: string) {
    const response = await upVotePostById(postId);
    if (response !== 'Sucessfully upvoted post!') {
      await removeUpVoteByPostId(postId);
    }
    getHomeFeed();
  }

  async function handlePostReaction(postId: string, type: string) {
    const response = await reactToPostById(postId, type);
    if (response !== 'Sucessfully reacted to post!') {
      await removeReactionByPostId(postId, type);
    }
    getHomeFeed();
  }

  async function handleCommentUpvote(postId: string, commentId: string) {
    const response = await upVoteCommentByIdAndPostId(postId, commentId);
    if (response !== 'Sucessfully upvoted commented!') {
      await removeCommentUpvoteByIdAndPostId(postId, commentId);
    }
    getHomeFeed();
  }

  async function handleCommentReaction(postId: string, commentId: string, type: string) {
    const response = await reactToCommentByIdAndPostId(postId, commentId, type);
    if (response !== 'Sucessfully reacted to comment!') {
      await removeCommentReactionByIdAndPostId(postId, commentId, type);
    }
    getHomeFeed();
  }

  async function handleDeletePost(postId: string) {
    await removePostById(postId);
  }

  async function handleDeleteComment(postId: string, commentId: string) {
    await removeCommentByIdAndPostId(postId, commentId);
  }

  return (
    <List sx={{ width: '100%', maxWidth: 440, bgcolor: 'background.paper' }}>
      {!user.userName ? (
        <Paper sx={{ marginBottom: 2 }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#b71c1c' }}>A</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Login to Create a Post!"
              secondary="Go ahead and share your thoughts with the world!"
            />
          </ListItem>
        </Paper>
      ) : null}

      {posts
        ? posts
            .slice(0)
            .reverse()
            .map((post, index) => (
              <>
                <Paper key={post.postId} sx={{ marginBottom: 2 }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: post.userBackgroundColor }}>
                        {post.userName.split('')[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.userName + ' --> ' + post.title}
                      secondary={<Linkify>{post.content}</Linkify>}
                    />
                    {post.userName === user.userName ? (
                      <DeletePostMenu post={post} handleDelete={handleDeletePost} />
                    ) : null}
                  </ListItem>
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src={post.photo}
                      alt="Uploaded Photo"
                      loading="lazy"
                      style={{
                        overflow: 'hidden',
                        maxWidth: 340,
                        maxHeight: 340,
                      }}
                    />
                  </Box>
                  {post.comments.length != 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">
                        {`Comments: ${post.comments.length}`}
                      </Typography>
                      <Typography variant="caption">
                        {DateTime.fromMillis(
                          Number.parseInt(post.createdAt),
                        ).toRelative()}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption">
                        {DateTime.fromMillis(
                          Number.parseInt(post.createdAt),
                        ).toRelative()}
                      </Typography>
                    </Box>
                  )}

                  <PostReactions
                    post={post}
                    handleUpvote={handlePostUpvote}
                    handleReaction={handlePostReaction}
                  />
                  {post.comments.length != 0
                    ? post.comments
                        .slice(0)
                        .reverse()
                        .map((comment, index) => (
                          <>
                            <Paper key={comment.commentId}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar sx={{ bgcolor: post.userBackgroundColor }}>
                                    {post.userName.split('')[0]}
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={comment.userName}
                                  secondary={<Linkify>{comment.content}</Linkify>}
                                />
                                {post.userName === user.userName ? (
                                  <DeleteCommentMenu
                                    post={post}
                                    comment={comment}
                                    handleDelete={handleDeleteComment}
                                  />
                                ) : null}
                              </ListItem>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="caption" gutterBottom>
                                  {DateTime.fromMillis(
                                    Number.parseInt(comment.createdAt),
                                  ).toRelative()}
                                </Typography>
                              </Box>
                              <CommentReactions
                                post={post}
                                comment={comment}
                                handleUpvote={handleCommentUpvote}
                                handleReaction={handleCommentReaction}
                              />
                            </Paper>
                          </>
                        ))
                    : null}
                </Paper>
              </>
            ))
        : null}
    </List>
  );
}
