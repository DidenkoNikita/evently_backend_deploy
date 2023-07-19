import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {};
  
  async getStories() {
    return await this.prisma.story.findMany();
  }
}