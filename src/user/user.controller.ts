import { Body, Controller, Post, Put, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";

export interface UserId {
  user_id: number
}

export interface Data {
  type: string;
  user_id: number;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user')
  async getUser(@Body() userId: UserId, @Res() res: Response) {
    try {
      const user = await this.userService.getUser(userId)
      
      res.status(200).json(user);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/user_list')
  async getUserList(@Body() userId: UserId, @Res() res: Response) {
    try {
      const users = await this.userService.getUserList(userId);
      res.status(200).json(users)
    } catch(e) {
      return console.log(e);
    }
  }

  @Put('/user')
  async updateCity(@Body() userCity, @Res() res: Response) {
    try {
      const user = await this.userService.updateCity(userCity)
      res.status(200).json(user);
    } catch(e) {
      return console.log(e);
    }
  }

  @Put('/user_confidetiality_phone')
  async updateConfidentialityPhone(@Body() data: Data, @Res() res: Response) {
    try {
      const confidentiality = await this.userService.updateConfidentialityPhone(data);
      res.status(200).json(confidentiality);
    } catch(e) {
      return console.log(e);
    }
  }

  @Put('/user_confidetiality_messages')
  async updateConfidentialityMessages(@Body() data: Data, @Res() res: Response) {
    try {
      console.log(data);
      
      const confidentiality = await this.userService.updateConfidentialityMessages(data);
      console.log(confidentiality);
      
      res.status(200).json(confidentiality);
    } catch(e) {
      return console.log(e);
    }
  }
}