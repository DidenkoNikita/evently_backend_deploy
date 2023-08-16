import { Body, Controller, Post, Put, Res } from "@nestjs/common";

import { Response } from "express";

import { UserService } from "./user.service";
import { City, ColorTheme, Confidentiality, DataType, Theme, UserCity, UserId, UserList } from "./interface";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/user')
  async getUser(@Body() userId: UserId, @Res() res: Response): Promise<void> {
    try {
      const user: void | UserList = await this.userService.getUser(userId);
      res.status(200).json(user);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/user_list')
  async getUserList(@Res() res: Response): Promise<void> {
    try {
      const users: void | UserList[] = await this.userService.getUserList();
      res.status(200).json(users);
    } catch (e) {
      return console.log(e);
    }
  }

  @Put('/user')
  async updateCity(@Body() userCity: UserCity, @Res() res: Response): Promise<void> {
    try {
      const user: void | { userData: City } = await this.userService.updateCity(userCity);
      res.status(200).json(user);
    } catch (e) {
      return console.log(e);
    }
  }

  @Put('/user_confidetiality_phone')
  async updateConfidentialityPhone(@Body() data: DataType, @Res() res: Response): Promise<void> {
    try {
      const confidentiality: void | Confidentiality = await this.userService.updateConfidentialityPhone(data);
      res.status(200).json(confidentiality);
    } catch (e) {
      return console.log(e);
    }
  }

  @Put('/user_confidetiality_messages')
  async updateConfidentialityMessages(@Body() data: DataType, @Res() res: Response): Promise<void> {
    try {
      const confidentiality: void | Confidentiality = await this.userService.updateConfidentialityMessages(data);
      res.status(200).json(confidentiality);
    } catch (e) {
      return console.log(e);
    }
  }

  @Put('/change_color_theme')
  async changeColorTheme(@Body() data: Theme, @Res() res: Response): Promise<void> {
    try {
      const user: void | {userData: ColorTheme} = await this.userService.changeColorTheme(data);
      res.status(200).json(user);
    } catch (e) {
      return console.log(e);
    }
  }
}