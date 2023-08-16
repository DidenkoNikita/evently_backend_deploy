import { Body, Controller, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { NotificationService } from "./notification.service";
import { Confirm, Data, GetNotification, UpdateNotification } from "./interface";

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('/get_notifiactions')
  async getNotifications(@Body() data: GetNotification, @Res() res: Response): Promise<void> {
    try {
      const notifiactions: void | UpdateNotification[] = await this.notificationService.getNotification(data);
      res.status(200).json(notifiactions);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/create_notifiaction')
  async createNotification(@Body() data: Data, @Res() res: Response): Promise<void> {
    try {
      const notifiaction: void | Confirm = await this.notificationService.createNotification(data);
      res.status(200).json(notifiaction);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/confirm_notifiaction')
  async confirmNotification(@Body() data: Confirm, @Res() res: Response): Promise<void> {
    try {
      const notification: void | Confirm = await this.notificationService.confirmNotification(data);
      res.status(200).json(notification);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/reject_notifiaction')
  async rejectNotifications(@Body() data: Confirm, @Res() res: Response): Promise<void> {
    try {
      const notifiaction: void | Confirm = await this.notificationService.rejectNotifications(data);
      res.status(200).json(notifiaction);
    } catch (e) {
      return console.log(e);
    }
  }
}