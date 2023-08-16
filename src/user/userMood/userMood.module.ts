import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { UserMoodService } from "./userMood.service";
import { UserMoodController } from "./userMood.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [UserMoodController],
  providers: [
    SearchService,
    PrismaService,
    UserMoodService,
    TokenValidationService
  ]
})
export class UserMoodModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(UserMoodController);
  }
}