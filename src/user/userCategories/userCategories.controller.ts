import { Body, Controller, Put, Res } from "@nestjs/common";
import { UserCategoriesService } from "./userCategories.service";
import { Response } from "express";

@Controller('/change_categories')
export class UserCategoriesController {
  constructor(private readonly userCategoriesService: UserCategoriesService) {};

  @Put()
  async updateUserCategories(@Body() userCategories, @Res() res: Response) {
    try {
      const user = await this.userCategoriesService.updateUserCategories(userCategories);
      res.status(200).json({user});
    } catch(e) {
      return console.log(e);
    }
  }
}