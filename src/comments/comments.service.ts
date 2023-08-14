import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CommentDto, LikeCommentDto } from "./comments.controller";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {};

  async getComments() {
    const comments = await this.prisma.comment.findMany();
    
    const updatedComments = await Promise.all(comments.map(async (comment: any) => {
      
      const user = await this.prisma.user.findUnique({
        where: {
          id: comment.user_id
        },
        select: {
          link_avatar: true,
          name: true
        }
      });
      
      comment.link_avatar = user.link_avatar;
      comment.name = user.name;
      return comment;
    }));
    
    return updatedComments;
  }

  async createComment(commentDto: CommentDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: commentDto.user_id
      },
      select: {
        link_avatar: true,
        name: true
      }
    })

    const comment = await this.prisma.comment.create({
      data: {
        user_id: commentDto.user_id,
        post_id: commentDto.post_id,
        text: commentDto.text,
      }
    })
    
    return {...user, ...comment};
  }

  async likeComment(commentDto: LikeCommentDto) {
    const { user_id, comment_id } = commentDto;

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id
      },
      select: {
        link_avatar: true,
        name: true
      }
    });
    
    const check = await this.prisma.comment.findFirst({
      where: {
        id: comment_id
      }
    })    

    const checkId = check.like.find((id: number) => id === user_id);    

    if (checkId) {
      const updatedLike = check.like.filter((like) => like !== user_id);      

      const comment = await this.prisma.comment.update({
        where: {
          id: comment_id,
        },
        data: {
          like: updatedLike,
        },
      });

      return {...user, ...comment};
    } else {
      const updatedLike = [...check.like, user_id];
      
      const comment = await this.prisma.comment.update({
        where: {
          id: comment_id
        },
        data: {
          like: updatedLike
        }
      })

      return {...user, ...comment};
    }
  }
}