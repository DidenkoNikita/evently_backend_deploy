import { Body, Controller, Put, Res } from "@nestjs/common";
import { UserMoodService } from "./userMood.service";
import { Response } from "express";

@Controller('/change_mood')
export class UserMoodController {
  constructor(private readonly userMoodService: UserMoodService) {}

  @Put()
  async updateUserMood(@Body() userMood, @Res() res: Response ) {
    try {
      const user = await this.userMoodService.updateUserMood(userMood);
      res.status(200).json({user})
    } catch(e) {
      return console.log(e);
    }
  }
}