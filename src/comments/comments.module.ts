import { MiddlewareConsumer, Module, NestMiddleware, RequestMethod } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";

@Module({
  controllers: [CommentsController],
  providers: [PrismaService, CommentsService, SearchService, TokenValidationService]
})
export class CommentsModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .exclude(
        {path: 'comments', method: RequestMethod.GET}
      )
      .forRoutes(CommentsController)
  }
}
