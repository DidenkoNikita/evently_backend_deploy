import { Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { EventService } from "./event.service";

@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Post()
  async getEvents(@Res() res: Response) {
    try {
      const events = await this.eventService.getEvents();
      res.status(200).json(events)
    } catch(e) {
      return console.log(e);
    }
  }
}