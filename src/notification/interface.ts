export interface Data {
  userId: number;
  user_id: number;
}

export interface GetNotification {
  user_id: number;
}

export interface Confirm {
  id: number;
  user_id: number;
  creator_id: number;
}

export interface UpdateNotification {
  id: number;
  name: string;
  user_id: number;
  creator_id: number;
  link_avatar: string;
}

export interface User {
  friends_id: number[];
}