import { Body, Controller, Put, Res } from "@nestjs/common";

import { Response } from "express";

import { User } from "./interface";
import { UserCategoriesService } from "./userCategories.service";

@Controller('/change_categories')
export class UserCategoriesController {
  constructor(private readonly userCategoriesService: UserCategoriesService) { };

  @Put()
  async updateUserCategories(@Body() userCategories: User, @Res() res: Response): Promise<void> {
    try {
      const user: void | User = await this.userCategoriesService.updateUserCategories(userCategories);
      res.status(200).json(user);
    } catch (e) {
      return console.log(e);
    }
  }
}