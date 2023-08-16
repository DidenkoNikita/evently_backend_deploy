import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [NotificationController],
  providers: [
    PrismaService,
    SearchService,
    NotificationService,
    TokenValidationService
  ]
})
export class NotificationModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(NotificationController);
  }
}