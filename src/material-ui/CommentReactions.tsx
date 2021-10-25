import * as React from 'react';
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
