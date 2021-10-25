import * as React from 'react';
import { AuthContext } from '../context/AuthProvider';
import { DateTime } from 'luxon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { getPosts } from '../components/requests/BackendGetRequest';
import Post from '../../types/Post';
import {
  reactToPostById,
  upVotePostById,
} from '../components/requests/BackendPostRequest';

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

  async function handleUpvote(postId: string) {
    await upVotePostById(postId);
    getHomeFeed();
  }

  async function handleReaction(postId: string, type: string) {
    await reactToPostById(postId, type);
    getHomeFeed();
  }

  return (
    <List sx={{ width: '100%', maxWidth: 440, bgcolor: 'background.paper' }}>
      {!user.userName ? (
        <Paper>
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
                <Paper key={post.postId}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: post.userBackgroundColor }}>
                        {post.userName.split('')[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={post.userName + ' --> ' + post.title}
                      secondary={post.content}
                    />
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
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" gutterBottom>
                      {DateTime.fromMillis(Number.parseInt(post.createdAt)).toRelative()}
                    </Typography>
                  </Box>
                  <ListItem>
                    <IconButton onClick={() => handleUpvote(post.postId)} size="small">
                      {post.upVotes.length}
                      👍
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('😀', post.postId)}
                      size="small"
                    >
                      {post.reactions['😀'].length}
                      😀
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('😂', post.postId)}
                      size="small"
                    >
                      {post.reactions['😂'].length}
                      😂
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('😭', post.postId)}
                      size="small"
                    >
                      {post.reactions['😭'].length}
                      😭
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('🥰', post.postId)}
                      size="small"
                    >
                      {post.reactions['🥰'].length}
                      🥰
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('😍', post.postId)}
                      size="small"
                    >
                      {post.reactions['😍'].length}
                      😍
                    </IconButton>
                    <IconButton
                      onClick={() => handleReaction('🤢', post.postId)}
                      size="small"
                    >
                      {post.reactions['🤢'].length}
                      🤢
                    </IconButton>
                  </ListItem>
                </Paper>
              </>
            ))
        : null}
    </List>
  );
}
