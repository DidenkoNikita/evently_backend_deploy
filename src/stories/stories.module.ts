import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { StoriesController } from "./stories.controller";
import { StoriesService } from "./stories.service";

@Module({
  controllers: [StoriesController],
  providers: [PrismaService, StoriesService]
})
export class StoriesModule {};