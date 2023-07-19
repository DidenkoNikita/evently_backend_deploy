import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserMoodService {
  constructor(private prisma: PrismaService) {}

  async updateUserMood (userMoodDto) {
    const id = userMoodDto.user_id
    
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

    console.log(userMoodDto.userMood);

    console.log(id);

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

    const userMood = await this.prisma.user_mood.update({
      where: {
        user_id: id
      },
      data: {
        funny: userMoodDto.userMood.funny || false,
        sad: userMoodDto.userMood.sad || false,
        gambling: userMoodDto.userMood.gambling || false,
        romantic: userMoodDto.userMood.romantic || false,
        energetic: userMoodDto.userMood.energetic || false,
        festive: userMoodDto.userMood.festive || false,
        calm: userMoodDto.userMood.calm || false,
        friendly: userMoodDto.userMood.friendly || false,
        cognitive: userMoodDto.userMood.cognitive || false,
        dreamy: userMoodDto.userMood.dreamy || false,
        do_not_know: userMoodDto.userMood.do_not_know || false
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