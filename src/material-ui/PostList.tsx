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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import { getPosts } from '../components/requests/BackendGetRequest';
import Post from '../../types/Post';
import {
  commentOnPostById,
  createPost,
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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function PostList() {
  const { user } = React.useContext(AuthContext);
  const [posts, setPosts] = React.useState([] as Post[]);
  const [postTitle, setPostTitle] = React.useState('');
  const [postContent, setPostContent] = React.useState('');
  const [postPhoto, setPostPhoto] = React.useState('');
  const [commentContent, setCommentContent] = React.useState('');

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
    try {
      await upVotePostById(postId);
    } catch (error) {
      if (error === 'User has already upvoted') {
        await removeUpVoteByPostId(postId);
      } else {
        throw error;
      }
    }
    getHomeFeed();
  }

  async function handlePostReaction(postId: string, type: string) {
    try {
      await reactToPostById(postId, type);
    } catch (error) {
      if (error === 'User has already reacted') {
        await removeReactionByPostId(postId, type);
      } else {
        throw error;
      }
    }
    getHomeFeed();
  }

  async function handleCommentUpvote(postId: string, commentId: string) {
    try {
      await upVoteCommentByIdAndPostId(postId, commentId);
    } catch (error) {
      if (error === 'User has already upvoted this comment') {
        await removeCommentUpvoteByIdAndPostId(postId, commentId);
      } else {
        throw error;
      }
    }
    getHomeFeed();
  }

  async function handleCommentReaction(postId: string, commentId: string, type: string) {
    try {
      await reactToCommentByIdAndPostId(postId, commentId, type);
    } catch (error) {
      if (error === 'User has already reacted to this comment') {
        await removeCommentReactionByIdAndPostId(postId, commentId, type);
      } else {
        throw error;
      }
    }
    getHomeFeed();
  }

  async function handlePostCreate() {
    try {
      await createPost(postTitle, postContent, postPhoto);
    } catch (error) {
      setPostTitle('');
      setPostContent('');
      setPostPhoto('');
      getHomeFeed();
    }
  }

  async function handleCommentCreate(postId: string) {
    try {
      await commentOnPostById(postId, commentContent);
    } catch (error) {
      setPostContent('');
      getHomeFeed();
    }
  }

  async function handleDeletePost(postId: string) {
    try {
      await removePostById(postId);
    } catch (error) {
      getHomeFeed();
    }
  }

  async function handleDeleteComment(postId: string, commentId: string) {
    try {
      await removeCommentByIdAndPostId(postId, commentId);
    } catch (error) {
      getHomeFeed();
    }
  }

  function readUploadedFileAsBase64(inputFile: any) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(inputFile);
    });
  }

  async function handleFileUpload(event: any) {
    const fileContents = await readUploadedFileAsBase64(event.target.files[0]);
    setPostPhoto(fileContents as string);
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
      ) : (
        <Paper sx={{ marginBottom: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ textAlign: 'center' }} variant="h6">
              Create A Post!
            </Typography>
            <label htmlFor="icon-button-file">
              <Input
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleFileUpload}
              />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          {postPhoto ? (
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={postPhoto}
                alt="Uploaded Photo"
                loading="lazy"
                style={{
                  overflow: 'hidden',
                  maxWidth: 340,
                  maxHeight: 340,
                }}
              />
            </Box>
          ) : null}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 1,
            }}
          >
            <TextField
              id="postTitle"
              label="Post Title"
              variant="filled"
              fullWidth
              value={postTitle}
              onChange={(event) => setPostTitle(event.target.value)}
            />
            <TextField
              id="postContent"
              label="Post Content"
              variant="filled"
              fullWidth
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
            />
          </Box>
          <Button variant="contained" fullWidth onClick={() => handlePostCreate()}>
            Submit
          </Button>
        </Paper>
      )}

      {posts
        ? posts
            .slice(0)
            .reverse()
            .map((post, index) => (
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
                    src={post.photo ? post.photo : ''}
                    alt={post.photo ? 'Uploaded Photo' : ''}
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
                      {DateTime.fromMillis(Number.parseInt(post.createdAt)).toRelative()}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography variant="caption">
                      {DateTime.fromMillis(Number.parseInt(post.createdAt)).toRelative()}
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
                        <Paper key={comment.commentId}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar sx={{ bgcolor: post.userBackgroundColor }}>
                                {comment.userName.split('')[0]}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={comment.userName}
                              secondary={<Linkify>{comment.content}</Linkify>}
                            />
                            {comment.userName === user.userName ? (
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
                      ))
                  : null}
                {user.userName ? (
                  <Paper sx={{ marginBottom: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="caption">Post a comment!</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        marginBottom: 1,
                      }}
                    >
                      <TextField
                        id="commentContent"
                        label="Your Comment!"
                        variant="filled"
                        size="small"
                        fullWidth
                        value={commentContent}
                        onChange={(event) => setCommentContent(event.target.value)}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleCommentCreate(post.postId)}
                    >
                      Submit
                    </Button>
                  </Paper>
                ) : null}
              </Paper>
            ))
        : null}
    </List>
  );
}
