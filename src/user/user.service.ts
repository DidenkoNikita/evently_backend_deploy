import { Injectable } from "@nestjs/common";

import { Mood } from "./userMood/interface";
import { PrismaService } from "src/prisma.service";
import { Categories } from "./userCategories/interface";
import { City, ColorTheme, Confidentiality, DataType, Theme, UserCity, UserId, UserList, UserSearch } from "./interface";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUser(userId: UserId): Promise<void | UserList> {
    try {
      const id: number = userId.user_id;

      const userData: UserSearch = await this.prisma.user.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          name: true,
          city: true,
          phone: true,
          gender: true,
          friends_id: true,
          link_avatar: true,
          color_theme: true,
          date_of_birth: true
        }
      })

      const userCategories: Categories = await this.prisma.user_categories.findUnique({
        where: {
          user_id: id
        },
        select: {
          cafe: true,
          bars: true,
          show: true,
          sport: true,
          games: true,
          quests: true,
          cinema: true,
          dancing: true,
          parties: true,
          theaters: true,
          lectures: true,
          concerts: true,
          for_free: true,
          restaurants: true,
          trade_fairs: true
        }
      })

      const userMood: Mood = await this.prisma.user_mood.findUnique({
        where: {
          user_id: id
        },
        select: {
          sad: true,
          calm: true,
          funny: true,
          dreamy: true,
          festive: true,
          friendly: true,
          gambling: true,
          romantic: true,
          energetic: true,
          cognitive: true,
          do_not_know: true
        }
      })

      const phoneConfidentiality: Confidentiality = await this.prisma.phone_confidentiality.findUnique({
        where: {
          user_id: id
        },
        select: {
          all: true,
          nobody: true,
          my_friends: true
        }
      })

      const messageConfidentiality: Confidentiality = await this.prisma.message_confidentiality.findUnique({
        where: {
          user_id: id
        },
        select: {
          all: true,
          nobody: true,
          my_friends: true
        }
      })

      return {
        user: userData,
        userCategories,
        userMood,
        phoneConfidentiality,
        messageConfidentiality
      };
    } catch (e) {
      return console.log(e);
    }
  }

  async getUserList(): Promise<void | UserList[]> {
    try {
      const users: UserSearch[] = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          city: true,
          phone: true,
          gender: true,
          friends_id: true,
          link_avatar: true,
          date_of_birth: true,
        }
      });

      const usersList: UserList[] = await Promise.all(users.map(async (user: any) => {
        const userCategories: Categories = await this.prisma.user_categories.findUnique({
          where: {
            user_id: user.id
          },
          select: {
            cafe: true,
            bars: true,
            show: true,
            sport: true,
            games: true,
            quests: true,
            cinema: true,
            parties: true,
            dancing: true,
            lectures: true,
            concerts: true,
            for_free: true,
            theaters: true,
            restaurants: true,
            trade_fairs: true
          }
        })

        const userMood: Mood = await this.prisma.user_mood.findUnique({
          where: {
            user_id: user.id
          },
          select: {
            sad: true,
            calm: true,
            funny: true,
            dreamy: true,
            festive: true,
            gambling: true,
            romantic: true,
            friendly: true,
            energetic: true,
            cognitive: true,
            do_not_know: true
          }
        })
        const phoneConfidentiality: Confidentiality = await this.prisma.phone_confidentiality.findUnique({
          where: {
            user_id: user.id
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })

        const messageConfidentiality: Confidentiality = await this.prisma.message_confidentiality.findUnique({
          where: {
            user_id: user.id
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })

        user.userCategories = userCategories;
        user.userMood = userMood;
        user.messageConfidentiality = messageConfidentiality;
        user.phoneConfidentiality = phoneConfidentiality;
        return user
      }))
      return usersList;
    } catch (e) {
      return console.log(e);
    }
  }

  async updateCity(userCity: UserCity): Promise<void | { userData: City }> {
    try {
      const id: number = userCity.user_id;

      const userData: City = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          city: userCity.city
        },
        select: {
          city: true
        }
      })

      return { userData };
    } catch (e) {
      return console.log(e);
    }
  }

  async changeColorTheme(data: Theme): Promise<void | { userData: ColorTheme }> {
    try {
      const userData: ColorTheme = await this.prisma.user.update({
        where: {
          id: data.user_id
        },
        data: {
          color_theme: data.theme
        },
        select: {
          color_theme: true
        }
      })

      return { userData };
    } catch (e) {
      return console.log(e);
    }
  }

  async updateConfidentialityPhone(data: DataType): Promise<void | Confidentiality> {
    try {
      if (data.type === 'All') {
        const confidentiality: Confidentiality = await this.prisma.phone_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: true,
            nobody: false,
            my_friends: false
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })
        return confidentiality;
      }

      if (data.type === 'My friends') {
        const confidentiality: Confidentiality = await this.prisma.phone_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: false,
            nobody: false,
            my_friends: true
          },
          select: {
            all: true,
            my_friends: true,
            nobody: true
          }
        })
        return confidentiality;
      }

      if (data.type === 'Nobody') {
        const confidentiality: Confidentiality = await this.prisma.phone_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: false,
            nobody: true,
            my_friends: false
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })
        return confidentiality;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async updateConfidentialityMessages(data: DataType) {
    try {
      if (data.type === 'All') {
        const confidentiality: Confidentiality = await this.prisma.message_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: true,
            nobody: false,
            my_friends: false
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })
        return confidentiality;
      }

      if (data.type === 'My friends') {
        const confidentiality: Confidentiality = await this.prisma.message_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: false,
            nobody: false,
            my_friends: true
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })
        return confidentiality;
      }

      if (data.type === 'Nobody') {
        const confidentiality: Confidentiality = await this.prisma.message_confidentiality.update({
          where: {
            user_id: data.user_id
          },
          data: {
            all: false,
            nobody: true,
            my_friends: false
          },
          select: {
            all: true,
            nobody: true,
            my_friends: true
          }
        })
        return confidentiality;
      }
    } catch (e) {
      return console.log(e);
    }
  }
}