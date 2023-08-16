import { Injectable } from "@nestjs/common";

import { Mood, User } from "./interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserMoodService {
  constructor(private prisma: PrismaService) { }

  async updateUserMood(userMoodDto: User) {
    try {
      const id = userMoodDto.user_id;
  
      const userMood: Mood = await this.prisma.user_mood.update({
        where: {
          user_id: id
        },
        data: {
          sad: userMoodDto.userMood.sad || false,
          calm: userMoodDto.userMood.calm || false,
          funny: userMoodDto.userMood.funny || false,
          dreamy: userMoodDto.userMood.dreamy || false,
          festive: userMoodDto.userMood.festive || false,
          friendly: userMoodDto.userMood.friendly || false,
          gambling: userMoodDto.userMood.gambling || false,
          romantic: userMoodDto.userMood.romantic || false,
          energetic: userMoodDto.userMood.energetic || false,
          cognitive: userMoodDto.userMood.cognitive || false,
          do_not_know: userMoodDto.userMood.do_not_know || false
        },
        select: {
          sad: true,
          calm: true,
          funny: true,
          dreamy: true,
          festive: true,
          gambling: true,
          friendly: true,
          romantic: true,
          energetic: true,
          cognitive: true,
          do_not_know: true
        }
      })
  
      return { userMood };
    } catch (e) {
      return console.log(e);
    }
  }
}