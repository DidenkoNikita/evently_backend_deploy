import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";

import { BrandService } from "./brand.service";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { BrandController } from "./brand.controller";
import { TokenValidationService } from "src/service/validate-token";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";

@Module({
  controllers: [BrandController],
  providers: [
    BrandService,
    PrismaService,
    SearchService,
    TokenValidationService
  ]
})
export class BrandModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(BrandController);
  }
}