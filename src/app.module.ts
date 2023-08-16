import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { SearchService } from './service/search';
import { PostsModule } from './posts/posts.module';
import { BrandModule } from './brand/brand.module';
import { EventModule } from './event/event.module';
import { ReviewModule } from './review/review.module';
import { StoriesModule } from './stories/stories.module';
import { CommentsModule } from './comments/comments.module';
import { UserMoodModule } from './user/userMood/userMood.module';
import { TokenValidationService } from './service/validate-token';
import { SubscribtonModule } from './subscription/subscription.module';
import { NotificationModule } from './notification/notification.module';
import { UploadAvatarModule } from './user/uploadAvatar/uploadAvatar.module';
import { UserCategoriesModule } from './user/userCategories/userCategories.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
    EventModule,
    PostsModule,
    BrandModule,
    ReviewModule,
    StoriesModule,
    CommentsModule,
    UserMoodModule,
    SubscribtonModule,
    UploadAvatarModule,
    NotificationModule,
    UserCategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    SearchService,
    TokenValidationService
  ],
})
export class AppModule { };