import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from './chat.controller';
import { SearchService } from 'src/service/search';
import { TokenValidationService } from 'src/service/validate-token';
import { CheckTokenMiddleware } from 'src/middleware/checkToken.middleware';

@Module({
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ChatService,
    PrismaService,
    SearchService,
    TokenValidationService
  ]
})
export class ChatModule {
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error("Method not implemented.");
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckTokenMiddleware).forRoutes(ChatController);
  }
}
