export interface GetSubscribtion {
  user_id: number;
}

export interface Data {
  user_id: number;
  brand_id: number;
}

export interface Subscription {
  id: number;
  user_id: number;
  brand_id: number;
}

export interface Brand {
  name: string;
  type: string;
  link_photo: string;
}

export interface UpdateSubscription {
  id: number;
  name: string;
  type: string;
  user_id: number;
  brand_id: number;
  link_photo: string;
}