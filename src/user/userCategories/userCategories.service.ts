import { Injectable } from "@nestjs/common";

import { Categories, User } from "./interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserCategoriesService {
  constructor(private prisma: PrismaService) { }

  async updateUserCategories(userCategoriesDto: User): Promise<void | User> {
    try {
      const id = userCategoriesDto.user_id;

      const userCategories: Categories = await this.prisma.user_categories.update({
        where: {
          user_id: id
        },
        data: {
          show: userCategoriesDto.userCategories.show || false,
          cafe: userCategoriesDto.userCategories.cafe || false,
          bars: userCategoriesDto.userCategories.bars || false,
          games: userCategoriesDto.userCategories.games || false,
          sport: userCategoriesDto.userCategories.sport || false,
          quests: userCategoriesDto.userCategories.quests || false,
          cinema: userCategoriesDto.userCategories.cinema || false,
          dancing: userCategoriesDto.userCategories.dancing || false,
          parties: userCategoriesDto.userCategories.parties || false,
          lectures: userCategoriesDto.userCategories.lectures || false,
          concerts: userCategoriesDto.userCategories.concerts || false,
          for_free: userCategoriesDto.userCategories.for_free || false,
          theaters: userCategoriesDto.userCategories.theaters || false,
          restaurants: userCategoriesDto.userCategories.restaurants || false,
          trade_fairs: userCategoriesDto.userCategories.trade_fairs || false,
        },
        select: {
          show: true,
          cafe: true,
          bars: true,
          sport: true,
          games: true,
          cinema: true,
          quests: true,
          parties: true,
          dancing: true,
          lectures: true,
          concerts: true,
          for_free: true,
          theaters: true,
          restaurants: true,
          trade_fairs: true,
        }
      })

      return { userCategories };
    } catch (e) {
      return console.log(e);
    }
  }
}