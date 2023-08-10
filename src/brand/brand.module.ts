import { MiddlewareConsumer, Module, NestMiddleware } from "@nestjs/common";
import { CheckTokenMiddleware } from "src/middleware/checkToken.middleware";
import { PrismaService } from "src/prisma.service";
import { SearchService } from "src/service/search";
import { TokenValidationService } from "src/service/validate-token";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";

@Module({
  controllers: [BrandController],
  providers: [PrismaService, SearchService, TokenValidationService, BrandService]
})
export class BrandModule implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(BrandController);
  }
}