export interface Data {
  text: string;
  grade: number;
  user_id: number;
  brand_id: number;
}

export interface GetReview {
  user_id: number;
}

export interface Review {
  id: number;
  text: string;
  grade: number;
  user_id: number;
  created_at: Date;
  brand_id: number;
}

export interface UpdateReview {
  id: number;
  text: string;
  name: string;
  grade: number;
  user_id: number;
  created_at: Date;
  brand_id: number;
  link_avatar: string;
}

export interface User {
  name: string;
  link_avatar: string;
}