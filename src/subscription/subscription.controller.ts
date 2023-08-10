import { Body, Controller, Delete, Post, Res } from "@nestjs/common";
import { SubscribtionService } from "./subscription.service";
import { Response } from "express";

export interface GetSubscribtion {
  user_id: number;
}

export interface Data {
  user_id: number;
  brand_id: number;
}

@Controller()
export class SubscribtionController {
  constructor(private readonly subscribtionService: SubscribtionService) {}

  @Post('/get_subscribtion')
  async getSubscription(@Body() data: GetSubscribtion, @Res() res: Response) {
    try {
      const subscriptions = await this.subscribtionService.getSubscription(data);
      res.status(200).json(subscriptions);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/create_subscription')
  async createSubscription(@Body() data: Data, @Res() res: Response) {
    try {
      const subscription = await this.subscribtionService.createSubscription(data);
      res.status(200).json(subscription);
    } catch(e) {
      return console.log(e);
    }
  }

  @Delete('remove_subscription')
  async removeSubscription(@Body() data: Data, @Res() res: Response) {
    try {
      const subscription = await this.subscribtionService.removeSubscription(data);
      res.status(200).json(subscription);
    } catch(e) {
      return console.log(e);
    }
  }
}