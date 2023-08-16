import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { EventService } from "./event.service";
import { SearchService } from "src/service/search";
import { PrismaService } from "src/prisma.service";
import { EventController } from "./event.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [EventController],
  providers: [
    EventService,
    PrismaService,
    SearchService,
    TokenValidationService
  ]
})
export class EventModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(EventController);
  }
}