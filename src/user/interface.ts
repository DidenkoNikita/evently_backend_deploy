import { Categories } from "./userCategories/interface";
import { Mood } from "./userMood/interface";

export interface Login {
  phone: string;
  password: string;
  color_theme: boolean;
}

export interface LoginI {
  user: Login;
}

export interface User {
  id: number;
  name: string;
  password: string;
}

export interface UpdateUser {
  color_theme: boolean;
}

export interface ReturnLogin {
  id: number;
  accessToken: string;
  color_theme: boolean;
  refreshToken?: string;
}

export interface UserData {
  user: {
    name: string;
    city: string;
    phone: string;
    gender: string;
    password: string;
    date_of_birth: string
  },
  user_categories: {
    show?: boolean;
    cafe?: boolean;
    bars?: boolean;
    sport?: boolean;
    games?: boolean;
    quests?: boolean;
    cinema?: boolean;
    dancing?: boolean;
    parties?: boolean;
    lectures?: boolean;
    concerts?: boolean;
    for_free?: boolean;
    theaters?: boolean;
    restaurants?: boolean;
    trade_fairs?: boolean;
  },
  user_mood: {
    calm?: boolean;
    sad?: boolean;
    funny?: boolean;
    dreamy?: boolean;
    festive?: boolean;
    friendly?: boolean;
    gambling?: boolean;
    romantic?: boolean;
    energetic?: boolean;
    cognitive?: boolean;
    do_not_know?: boolean;
  }
}

export interface Registration {
  user: UserData
}

export interface DataUser {
  name: string;
  city: string;
  phone: string;
  gender: string;
  password: string;
  date_of_birth: string;
}

export interface Data {
  id: number;
  name: string;
  color_theme: boolean;
}

export interface UserId {
  user_id: number
}

export interface DataType {
  type: string;
  user_id: number;
}

export interface Theme {
  theme: boolean;
  user_id: number;
}

export interface UserSearch {
  id: number;
  name: string;
  city: string;
  phone: string;
  gender: string;
  friends_id: number[];
  link_avatar: string;
  color_theme?: boolean;
  date_of_birth: string;
}

export interface Confidentiality {
  all: boolean;
  nobody: boolean;
  my_friends: boolean;
}

export interface UserList {
  user: UserSearch;
  userCategories: Categories;
  userMood: Mood;
  phoneConfidentiality: Confidentiality;
  messageConfidentiality: Confidentiality;
}

export interface UserCity {
  user_id: number;
  city: string;
}

export interface City {
  city: string;
}

export interface ColorTheme {
  color_theme: boolean;
}