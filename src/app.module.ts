import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { StoriesModule } from './stories/stories.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UserCategoriesModule } from './user/userCategories/userCategories.module';
import { UserMoodModule } from './user/userMood/userMood.module';
import { UploadAvatarModule } from './user/uploadAvatar/uploadAvatar.module';

@Module({
  imports: [UserModule, StoriesModule, PostsModule, CommentsModule, UserCategoriesModule, UserMoodModule, UploadAvatarModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {};