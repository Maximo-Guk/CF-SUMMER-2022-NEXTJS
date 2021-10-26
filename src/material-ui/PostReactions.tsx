import * as React from 'react';
import Post from '../../types/Post';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';

interface propsTypes {
  post: Post;
  handleUpvote(postId: string): Promise<void>;
  handleReaction(postId: string, type: string): Promise<void>;
}

export default function PostReactions(props: propsTypes) {
  // Populate each reaction with the number of reactions in post
  // associate handleUpvote and handleReaction with each reaction so they can be differentiated when being reacted to
  return (
    <ListItem>
      <IconButton onClick={() => props.handleUpvote(props.post.postId)} size="small">
        {props.post.upVotes.length}
        👍
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '😀')}
        size="small"
      >
        {props.post.reactions['😀'].length}
        😀
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '😂')}
        size="small"
      >
        {props.post.reactions['😂'].length}
        😂
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '😭')}
        size="small"
      >
        {props.post.reactions['😭'].length}
        😭
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '🥰')}
        size="small"
      >
        {props.post.reactions['🥰'].length}
        🥰
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '😍')}
        size="small"
      >
        {props.post.reactions['😍'].length}
        😍
      </IconButton>
      <IconButton
        onClick={() => props.handleReaction(props.post.postId, '🤢')}
        size="small"
      >
        {props.post.reactions['🤢'].length}
        🤢
      </IconButton>
    </ListItem>
  );
}
