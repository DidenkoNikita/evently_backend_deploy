export interface LikePostDto {
  user_id: number;
  post_id: number;
}

export interface PostI {
  id: number;
  type: string;
  title: string;
  like: number[];
  brand_id: number;
  user_name: string;
  link_photo: string;
  link_avatar: string;
}