interface reactionsTypes {
  '😀': string[];
  '😂': string[];
  '😭': string[];
  '🥰': string[];
  '😍': string[];
  '🤢': string[];
}

interface commentsTypes {
  commentId: string;
  content: string;
  userName: string;
  userBackgroundColor: string;
  upVotes: string[];
  reactions: reactionsTypes[];
  createdAt: string;
}

export default interface Post {
  postId: string;
  title: string;
  userName: string;
  userBackgroundColor: string;
  content: string;
  photo: string;
  upVotes: string[];
  reactions: reactionsTypes;
  comments: commentsTypes[];
  createdAt: string;
}
