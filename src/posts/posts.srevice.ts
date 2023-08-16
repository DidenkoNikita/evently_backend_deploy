import { Injectable } from "@nestjs/common";

import { LikePostDto, PostI } from "./interface";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostsSevice {
  constructor(private prisma: PrismaService) { };

  async getPosts(): Promise<void | { post: PostI[] }> {
    try {
      const post: PostI[] = await this.prisma.post.findMany();
      return { post };
    } catch (e) {
      return console.log(e);
    }
  }

  async likeAPost(likePostDto: LikePostDto): Promise<void | PostI> {
    try {
      const { user_id, post_id } = likePostDto;

      const check: PostI = await this.prisma.post.findUnique({
        where: {
          id: post_id
        }
      })

      const checkId: number[] = check.like.filter((id: number) => id === user_id);

      if (checkId.length === 0) {
        const updatedLike: number[] = [...check.like, user_id];

        const posts: PostI = await this.prisma.post.update({
          where: {
            id: post_id
          },
          data: {
            like: updatedLike
          }
        })

        return posts;
      } else {
        const updatedLike: number[] = check.like.filter((like) => like !== user_id);

        const posts: PostI = await this.prisma.post.update({
          where: {
            id: post_id,
          },
          data: {
            like: updatedLike,
          },
        });

        return posts;
      }
    } catch (e) {
      return console.log(e);
    }
  }
}