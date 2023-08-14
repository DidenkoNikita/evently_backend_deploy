import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";

@Module({
  controllers: [ReviewController],
  providers: [PrismaService, SearchService, TokenValidationService, ReviewService]
})
export class ReviewModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(ReviewController);
  }
}