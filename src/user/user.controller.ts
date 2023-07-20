import { Body, Controller, Post, Put, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";

export interface UserId {
  user_id: number
}

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async getUser(@Body() userId: UserId, @Res() res: Response) {
    try {
      const user = await this.userService.getUser(userId)
      
      res.status(200).json(user);
    } catch(e) {
      return console.log(e);
    }
  }

  @Put()
  async updateCity(@Body() userCity, @Res() res: Response) {
    try {
      const user = await this.userService.updateCity(userCity)
      res.status(200).json(user);
    } catch(e) {
      return console.log(e);
    }
  }
}