import { Body, Controller, Put, Res } from "@nestjs/common";

import { Response } from "express";

import { User } from "./interface";
import { UserMoodService } from "./userMood.service";

@Controller('/change_mood')
export class UserMoodController {
  constructor(private readonly userMoodService: UserMoodService) { }

  @Put()
  async updateUserMood(@Body() userMood: User, @Res() res: Response): Promise<void> {
    try {
      const user: void | User = await this.userMoodService.updateUserMood(userMood);
      res.status(200).json(user)
    } catch (e) {
      return console.log(e);
    }
  }
}