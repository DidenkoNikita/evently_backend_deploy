export interface Mood {
  sad?: boolean;
  calm?: boolean;
  funny?: boolean;
  dreamy?: boolean;
  festive?: boolean;
  gambling?: boolean;
  friendly?: boolean;
  romantic?: boolean;
  energetic?: boolean;
  cognitive?: boolean;
  do_not_know?: boolean;
}

export interface User {
  userMood: Mood;
  user_id?: number;
}