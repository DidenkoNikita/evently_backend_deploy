export interface CommentDto {
  text: string;
  user_id: number;
  post_id: number;
}

export interface LikeCommentDto {
  user_id: number;
  comment_id: number;
}

export interface Comment {
  id: number;
  text: string;
  like: number[];
  user_id: number;
  post_id: number;
  created_at: Date;
}

export interface UpdateComment {
  id: number;
  text: string;
  name: string;
  like: number[];
  user_id: number;
  post_id: number;
  created_at: Date;
  link_avatar: string;
}

export interface User {
  name: string;
  link_avatar: string;
}