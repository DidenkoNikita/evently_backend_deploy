export interface Categories {
  show?: boolean;
  cafe?: boolean;
  bars?: boolean;
  sport?: boolean;
  games?: boolean;
  cinema?: boolean;
  quests?: boolean;
  parties?: boolean;
  dancing?: boolean;
  lectures?: boolean;
  concerts?: boolean;
  for_free?: boolean;
  theaters?: boolean;
  restaurants?: boolean;
  trade_fairs?: boolean;
}

export interface User {
  user_id?: number;
  userCategories: Categories;
}