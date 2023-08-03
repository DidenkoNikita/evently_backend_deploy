import { Body, Controller, Post, Res } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { Response } from "express";

export interface Data {
  user_id: number;
  userId: number;
}

export interface GetNotification {
  user_id: number;
}

export interface Confirm {
  id: number;
  user_id: number;
  creator_id: number;
}

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/get_notifiactions')
  async getNotifications(@Body() data: GetNotification, @Res() res: Response) {
    try {
      console.log('notifications', data);
      
      const notifiactions = await this.notificationService.getNotification(data);
      console.log('data', notifiactions);
      
      res.status(200).json(notifiactions);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/create_notifiaction')
  async createNotification(@Body() data: Data, @Res() res: Response) {
    try {
      console.log(data);
      
      const notifiaction = await this.notificationService.createNotification(data);
      res.status(200).json(notifiaction);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/confirm_notifiaction')
  async confirmNotification(@Body() data: Confirm, @Res() res: Response) {
    try {
      const notification = await this.notificationService.confirmNotification(data);
      console.log('заявка', notification);
      
      res.status(200).json(notification);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/reject_notifiaction')
  async rejectNotifications(@Body() data: Confirm, @Res() res: Response) {
    try {
      const notifiaction = await this.notificationService.rejectNotifications(data);
      res.status(200).json(notifiaction);
    } catch(e) {
      return console.log(e);
    }
  }

}