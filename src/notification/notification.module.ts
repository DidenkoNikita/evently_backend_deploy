import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { NotificationController } from "./notification.controller";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { NotificationService } from "./notification.service";

@Module({
  controllers: [NotificationController],
  providers: [PrismaService, SearchService, TokenValidationService, NotificationService]
})
export class NotificationModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(NotificationController);
  }
}