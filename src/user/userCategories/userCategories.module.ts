import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { SearchService } from "src/service/search";
import { PrismaService } from "src/prisma.service";
import { UserCategoriesService } from "./userCategories.service";
import { TokenValidationService } from "src/service/validate-token";
import { UserCategoriesController } from "./userCategories.controller";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [UserCategoriesController],
  providers: [
    PrismaService,
    SearchService,
    UserCategoriesService,
    TokenValidationService
  ]
})
export class UserCategoriesModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(UserCategoriesController);
  }
}