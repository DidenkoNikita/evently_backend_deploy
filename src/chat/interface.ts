export interface ChatDto {
  user1Id: number;
  user2Id: number;
}

export interface UserData {
  user_id: number;
  user2Id: number;
}

export interface MessageData {
  text: string;
  user_id: number;
  chatId: number;
  user2Id: number;
  postId: number | null;
}

export interface UpdateMessage {
  id: number;
  userId: number
  user_id: number;
}

export interface DeleteChat {
  id: number;
  user_id: number;
}

export interface Data {
  user_id: number;
  brand_id: number;
}

export interface ChatData {
  id: number;
  name: string;
  users_id: number[];
  link_avatar: string;
}

export interface Message {
  id: number;
  text: string;
  user_id: number;
  chat_id: number;
  post_id: number;
  created_at: Date;
  is_read: boolean;
}

export interface Chat {
  id: number;
  updated_at: Date;
  users_id: number[];
}

export interface IChat {
  id: number;
  name: string;
  userId: number;
  postId: number;
  updated_at: Date;
  timeMessage: Date;
  users_id: number[];
  link_avatar: string;
  textMessage: string;
  isReadMessage: boolean;
  unreadMessages: number;
}

export interface User {
  name: string;
  link_avatar: string;
}

export interface ChatId {
  id: number;
}