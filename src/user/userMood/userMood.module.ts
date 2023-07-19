import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserMoodController } from "./userMood.controller";
import { UserMoodService } from "./userMood.service";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";

@Module({
  controllers: [UserMoodController],
  providers: [PrismaService, UserMoodService, SearchService, TokenValidationService]
})
export class UserMoodModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(UserMoodController);
  }
}