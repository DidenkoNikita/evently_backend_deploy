import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserCategoriesService {
  constructor(private prisma: PrismaService) {}

  async updateUserCategories (userCategoriesDto) {
    const id = userCategoriesDto.user_id
    
    const userData = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        phone: true,
        name: true,
        date_of_birth: true,
        gender: true,
        city: true,
        link_avatar: true
      }
    })

    console.log(userCategoriesDto.userCategories);

    console.log(id);
    
    

    const userCategories = await this.prisma.user_categories.update({
      where: {
        user_id: id
      },
      data: {
        restaurants: userCategoriesDto.userCategories.restaurants || false,
        trade_fairs: userCategoriesDto.userCategories.trade_fairs || false,
        lectures: userCategoriesDto.userCategories.lectures || false,
        cafe: userCategoriesDto.userCategories.cafe || false,
        bars: userCategoriesDto.userCategories.bars || false,
        sport: userCategoriesDto.userCategories.sport || false,
        dancing: userCategoriesDto.userCategories.dancing || false,
        games: userCategoriesDto.userCategories.games || false,
        quests: userCategoriesDto.userCategories.quests || false,
        concerts: userCategoriesDto.userCategories.concerts || false,
        parties: userCategoriesDto.userCategories.parties || false,
        show: userCategoriesDto.userCategories.show || false,
        for_free: userCategoriesDto.userCategories.for_free || false,
        cinema: userCategoriesDto.userCategories.cinema || false,
        theaters: userCategoriesDto.userCategories.theaters || false
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

    console.log('fuck',userData, userCategories, userMood);
    

    return {
      user: userData,
      userCategories,
      userMood
    };
  }
}