import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { StoriesService } from "./stories.service";
import { StoriesController } from "./stories.controller";

@Module({
  controllers: [StoriesController],
  providers: [
    PrismaService,
    StoriesService
  ]
})
export class StoriesModule { };