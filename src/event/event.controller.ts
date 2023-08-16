import { Controller, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { EventService } from "./event.service";
import { UpdateEvent } from "./interface";

@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) { }
  @Post()
  async getEvents(@Res() res: Response): Promise<void> {
    try {
      const events: void | UpdateEvent[] = await this.eventService.getEvents();
      res.status(200).json(events);
    } catch (e) {
      return console.log(e);
    }
  }
}