import { MiddlewareConsumer, Module, NestMiddleware, RequestMethod } from "@nestjs/common";

import { PostsSevice } from "./posts.srevice";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { PostsController } from "./posts.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [PostsController],
  providers: [
    PostsSevice,
    SearchService,
    PrismaService,
    TokenValidationService
  ]
})
export class PostsModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .exclude(
        { path: 'posts', method: RequestMethod.GET }
      )
      .forRoutes(PostsController)
  }
}