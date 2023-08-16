import { Injectable } from "@nestjs/common";

import { Stories } from "./interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) { };

  async getStories(): Promise<void | Stories[]> {
    try {
      return await this.prisma.story.findMany();
    } catch (e) {
      return console.log(e);
    }
  }
}