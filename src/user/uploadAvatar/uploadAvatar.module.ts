import { Module } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { UploadService } from "./uploadAvatar.service";
import { UploadAvatarController } from "./uploadAvatar.controller";

@Module({
  controllers: [UploadAvatarController],
  providers: [
    PrismaService,
    UploadService
  ]
})
export class UploadAvatarModule { }