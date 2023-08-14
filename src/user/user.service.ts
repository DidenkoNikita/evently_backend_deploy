import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Data, Theme, UserId } from "./user.controller";

@Injectable() 
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser (userId: UserId) {
    const id = userId.user_id
    
    const userData = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        phone: true,
        name: true,
        date_of_birth: true,
        gender: true,
        city: true,
        link_avatar: true,
        friends_id: true,
        color_theme: true
      }
    })

    const userCategories = await this.prisma.user_categories.findUnique({
      where: {
        user_id: id
      },
      select: {
        restaurants: true,
        trade_fairs: true,
        lectures: true,
        cafe: true,
        bars: true,
        sport: true,
        dancing: true,
        games: true,
        quests: true,
        concerts: true,
        parties: true,
        show: true,
        for_free: true,
        cinema: true,
        theaters: true
      }
    })

    const userMood = await this.prisma.user_mood.findUnique({
      where: {
        user_id: id
      },
      select: {
        funny: true,
        sad: true,
        gambling: true,
        romantic: true,
        energetic: true,
        festive: true,
        calm: true,
        friendly: true,
        cognitive: true,
        dreamy: true,
        do_not_know: true          
      }
    })   
    
    const phoneConfidentiality = await this.prisma.phone_confidentiality.findUnique({
      where: {
        user_id: id
      },
      select: {
        all: true,
        my_friends: true,
        nobody: true
      }
    })

    const messageConfidentiality = await this.prisma.message_confidentiality.findUnique({
      where: {
        user_id: id
      },
      select: {
        all: true,
        my_friends: true,
        nobody: true
      }
    })

    return {
      user: userData,
      userCategories,
      userMood,
      phoneConfidentiality,
      messageConfidentiality
    };
  }

  async getUserList (userId: UserId) {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        link_avatar: true,
        phone: true,
        city: true,
        date_of_birth: true,
        gender: true,
        friends_id: true
      }
    });

    const usersList = await Promise.all(users.map(async (user: any) => {
      const userCategories = await this.prisma.user_categories.findUnique({
        where: {
          user_id: user.id
        },
        select: {
          restaurants: true,
          trade_fairs: true,
          lectures: true,
          cafe: true,
          bars: true,
          sport: true,
          dancing: true,
          games: true,
          quests: true,
          concerts: true,
          parties: true,
          show: true,
          for_free: true,
          cinema: true,
          theaters: true
        }
      })

      const userMood = await this.prisma.user_mood.findUnique({
        where: {
          user_id: user.id
        },
        select: {
          funny: true,
          sad: true,
          gambling: true,
          romantic: true,
          energetic: true,
          festive: true,
          calm: true,
          friendly: true,
          cognitive: true,
          dreamy: true,
          do_not_know: true          
        }
      })    
      const phoneConfidentiality = await this.prisma.phone_confidentiality.findUnique({
        where: {
          user_id: user.id
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
  
      const messageConfidentiality = await this.prisma.message_confidentiality.findUnique({
        where: {
          user_id: user.id
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
      
      user.userCategories = userCategories;
      user.userMood = userMood;     
      user.messageConfidentiality = messageConfidentiality;
      user.phoneConfidentiality = phoneConfidentiality;
      return user
    }))
    return usersList;
  }

  async updateCity (userCity) {
    const id = userCity.user_id
    
    const userData = await this.prisma.user.update({
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

    return {userData};
  }

  async changeColorTheme(data: Theme) {
    const userData = await this.prisma.user.update({
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
    console.log(userData);
    
    return {userData};
  }

  async updateConfidentialityPhone(data: Data) {
    if (data.type === 'All') {
      const confidentiality = await this.prisma.phone_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: true,
          my_friends: false,
          nobody: false
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
      return confidentiality;
    }

    if (data.type === 'My friends') {
      const confidentiality = await this.prisma.phone_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: false,
          my_friends: true,
          nobody: false
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
      const confidentiality = await this.prisma.phone_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: false,
          my_friends: false,
          nobody: true
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
      return confidentiality;
    }
  }

  async updateConfidentialityMessages(data: Data) {
    if (data.type === 'All') {
      const confidentiality = await this.prisma.message_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: true,
          my_friends: false,
          nobody: false
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
      return confidentiality;
    }

    if (data.type === 'My friends') {
      const confidentiality = await this.prisma.message_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: false,
          my_friends: true,
          nobody: false
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
      const confidentiality = await this.prisma.message_confidentiality.update({
        where: {
          user_id: data.user_id
        },
        data: {
          all: false,
          my_friends: false,
          nobody: true
        },
        select: {
          all: true,
          my_friends: true,
          nobody: true
        }
      })
      return confidentiality;
    }
  }
}