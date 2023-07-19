import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { UploadAvatarController } from "./uploadAvatar.controller";
import { UploadService } from "./uploadAvatar.service";

@Module({
  controllers: [UploadAvatarController],
  providers: [PrismaService, UploadService, SearchService, TokenValidationService]
}) 
export class UploadAvatarModule {}
// implements NestMiddleware {
//   use(req: any, res: any, next: (error?: any) => void) {
//     throw new Error("Method not implemented.");
//   }
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckTokenMiddleware).forRoutes(UploadAvatarController);
//   }
// }