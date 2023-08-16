import { Controller, Get } from "@nestjs/common";

import { Stories } from "./interface";
import { StoriesService } from "./stories.service";

@Controller('/stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @Get()
  async stories(): Promise<void | Stories[]> {
    try {
      return await this.storiesService.getStories();
    } catch (e) {
      return console.log(e);
    }
  }
}