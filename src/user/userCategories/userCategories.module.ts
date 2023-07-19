import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserCategoriesController } from "./userCategories.controller";
import { UserCategoriesService } from "./userCategories.service";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { UserController } from "../user.controller";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";

@Module({
  controllers: [UserCategoriesController],
  providers: [PrismaService, UserCategoriesService, SearchService, TokenValidationService]
})
export class UserCategoriesModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(UserCategoriesController);
  }
}