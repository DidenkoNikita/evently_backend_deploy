import { Body, Controller, Delete, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { SubscribtionService } from "./subscription.service";
import { Data, GetSubscribtion, UpdateSubscription } from "./interface";

@Controller()
export class SubscribtionController {
  constructor(private readonly subscribtionService: SubscribtionService) { }

  @Post('/get_subscribtion')
  async getSubscription(@Body() data: GetSubscribtion, @Res() res: Response): Promise<void> {
    try {
      const subscriptions: void | UpdateSubscription[] = await this.subscribtionService.getSubscription(data);
      res.status(200).json(subscriptions);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/create_subscription')
  async createSubscription(@Body() data: Data, @Res() res: Response): Promise<void> {
    try {
      const subscription: void | UpdateSubscription = await this.subscribtionService.createSubscription(data);
      res.status(200).json(subscription);
    } catch (e) {
      return console.log(e);
    }
  }

  @Delete('remove_subscription')
  async removeSubscription(@Body() data: Data, @Res() res: Response): Promise<void> {
    try {
      const subscription: void | UpdateSubscription = await this.subscribtionService.removeSubscription(data);
      res.status(200).json(subscription);
    } catch (e) {
      return console.log(e);
    }
  }
}