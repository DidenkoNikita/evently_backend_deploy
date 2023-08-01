import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserId } from "./user.controller";

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
        link_avatar: true
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

    return {
      user: userData,
      userCategories,
      userMood
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
        gender: true
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
      
      user.userCategories = userCategories;
      user.userMood = userMood;      
      return user
    }))
    const usersListFilter = usersList.filter((user) => user.id !== userId.user_id)    
    return usersListFilter;
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
}