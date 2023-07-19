import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { LikePostDto } from "./posts.controller";

@Injectable()
export class PostsSevice {
  constructor(private prisma: PrismaService) {};

  async getPosts() {
    const post = await this.prisma.post.findMany();
            
    return {post};
  }

  async likeAPost(likePostDto: LikePostDto) {
    const { user_id, post_id } = likePostDto;
       
    const check = await this.prisma.post.findUnique({
      where: {
        id: post_id
      }
    })
    
    const checkId = check.like.filter((id: number) => id === user_id);
    
    if (checkId.length === 0) {
      const updatedLike = [...check.like, user_id];
      
      const posts = await this.prisma.post.update({
        where: {
          id: post_id
        },
        data: {
          like: updatedLike
        }
      })

      return posts;
    } else {
      const updatedLike = check.like.filter((like) => like !== user_id);      

      const posts = await this.prisma.post.update({
        where: {
          id: post_id,
        },
        data: {
          like: updatedLike,
        },
      });
      
      return posts;
    }
  }
}