import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
  controllers: [EventController],
  providers: [PrismaService, SearchService, TokenValidationService, EventService]
})
export class EventModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(EventController);
  }
}