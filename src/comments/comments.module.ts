import { MiddlewareConsumer, Module, NestMiddleware, RequestMethod } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [CommentsController],
  providers: [
    SearchService,
    PrismaService,
    CommentsService,
    TokenValidationService
  ]
})
export class CommentsModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .exclude(
        { path: 'comments', method: RequestMethod.GET }
      )
      .forRoutes(CommentsController)
  }
}
