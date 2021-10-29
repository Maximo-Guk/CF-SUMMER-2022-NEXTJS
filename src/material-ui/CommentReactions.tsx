import React from 'react';
import Post, { commentsTypes } from '../../types/Post';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';

interface propsTypes {
  post: Post;
  comment: commentsTypes;
  handleUpvote(postId: string, commentId: string): Promise<void>;
  handleReaction(postId: string, commentId: string, type: string): Promise<void>;
}

export default function CommentsReactions(props: propsTypes) {
  // Populate each reaction with the number of reactions in comment
  // associate handleUpvote and handleReaction with each reaction so they can be differentiated when being reacted to
  return (
    <ListItem>
      <IconButton
        onClick={() => props.handleUpvote(props.post.postId, props.comment.commentId)}
        size="small"
      >
        {props.comment.upVotes.length}
        👍
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '😀')
        }
        size="small"
      >
        {props.comment.reactions['😀'].length}
        😀
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '😂')
        }
        size="small"
      >
        {props.comment.reactions['😂'].length}
        😂
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '😭')
        }
        size="small"
      >
        {props.comment.reactions['😭'].length}
        😭
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '🥰')
        }
        size="small"
      >
        {props.comment.reactions['🥰'].length}
        🥰
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '😍')
        }
        size="small"
      >
        {props.comment.reactions['😍'].length}
        😍
      </IconButton>
      <IconButton
        onClick={() =>
          props.handleReaction(props.post.postId, props.comment.commentId, '🤢')
        }
        size="small"
      >
        {props.comment.reactions['🤢'].length}
        🤢
      </IconButton>
    </ListItem>
  );
}
