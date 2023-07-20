import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserMoodService {
  constructor(private prisma: PrismaService) {}

  async updateUserMood (userMoodDto) {
    const id = userMoodDto.user_id;

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

    return { userMood };
  }
}