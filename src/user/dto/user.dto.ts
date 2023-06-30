export class UserDto {
  readonly user: {
    readonly phone: string;
    readonly name: string;
    readonly date_of_birth: string;
    readonly gender: string;
    password: string;
    readonly city: string;
  };
  readonly userCategories: {
    readonly restaurants: boolean;
    readonly trade_fairs: boolean;
    readonly lectures: boolean;
    readonly cafe: boolean;
    readonly bars: boolean;
    readonly sport: boolean;
    readonly dancing: boolean;
    readonly games: boolean;
    readonly quests: boolean;
    readonly concerts: boolean;
    readonly parties: boolean;
    readonly show: boolean;
    readonly for_free: boolean;
    readonly cinema: boolean;
    readonly theaters: boolean;
  };
  readonly userMood: {
    readonly funny: boolean;
    readonly sad: boolean;
    readonly gambling: boolean;
    readonly romantic: boolean;
    readonly energetic: boolean;
    readonly festive: boolean;
    readonly calm: boolean;
    readonly friendly: boolean;
    readonly cognitive: boolean;
    readonly dreamy: boolean;
    readonly do_not_know: boolean;
  }
}