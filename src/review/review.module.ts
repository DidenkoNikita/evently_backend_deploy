import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { ReviewService } from "./review.service";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { ReviewController } from "./review.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [ReviewController],
  providers: [
    PrismaService,
    SearchService,
    ReviewService,
    TokenValidationService
  ]
})
export class ReviewModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(ReviewController);
  }
}