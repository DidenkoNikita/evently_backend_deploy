import { Controller, Get } from "@nestjs/common";
import { StoriesService } from "./stories.service";

@Controller('/stories')
export class StoriesController {
  constructor(private readonly storiesService : StoriesService) {}

  @Get()
  stories() {
    try {
      return this.storiesService.getStories();
    } catch(e) {
      return console.log(e);
    }
  }
}