import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { SubscribtionController } from "./subscription.controller";
import { SubscribtionService } from "./subscription.service";

@Module({
  controllers: [SubscribtionController],
  providers: [PrismaService, SearchService, TokenValidationService, SubscribtionService]
})
export class SubscribtonModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(SubscribtionController);
  }
}