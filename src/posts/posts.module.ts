import { MiddlewareConsumer, Module, NestMiddleware, RequestMethod } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { PostsController } from "./posts.controller";
import { PostsSevice } from "./posts.srevice";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";

@Module({
  controllers: [PostsController],
  providers: [PrismaService, PostsSevice, SearchService, TokenValidationService]
})
export class PostsModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .exclude(
        {path: 'posts', method: RequestMethod.GET}
      )
      .forRoutes(PostsController)
  }
}