import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { UserService } from "./user.service";
import { PrismaClient } from "@prisma/client";
import { LoginService } from "./login.service";
import { SignupService } from "./signup.service";
import { PrismaService } from "src/prisma.service";
import { UserController } from "./user.controller";
import { SearchService } from "src/service/search";
import { LoginController } from "./login.controller";
import { SignupController } from "./signup.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [SignupController, LoginController, UserController],
  providers: [LoginService, PrismaService, SignupService, PrismaClient, UserService, SearchService, TokenValidationService],
})
export class UserModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(UserController);
  }
}