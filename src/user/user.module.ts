import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";

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