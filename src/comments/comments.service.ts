import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { Comment, CommentDto, LikeCommentDto, UpdateComment, User } from "./interface";

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { };

  async getComments(): Promise<void | UpdateComment[]> {
    try {
      const comments: Comment[] = await this.prisma.comment.findMany();

      const updatedComments: UpdateComment[] = await Promise.all(comments.map(async (comment: any) => {

        const user: User = await this.prisma.user.findUnique({
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
    } catch (e) {
      return console.log(e);
    }
  }

  async createComment(commentDto: CommentDto): Promise<void | UpdateComment> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: commentDto.user_id
        },
        select: {
          link_avatar: true,
          name: true
        }
      })

      const comment: Comment = await this.prisma.comment.create({
        data: {
          user_id: commentDto.user_id,
          post_id: commentDto.post_id,
          text: commentDto.text,
        }
      })

      return { ...user, ...comment };
    } catch (e) {
      return console.log(e);
    }
  }

  async likeComment(commentDto: LikeCommentDto): Promise<void | UpdateComment> {
    try {
      const { user_id, comment_id } = commentDto;

      const user: User = await this.prisma.user.findUnique({
        where: {
          id: user_id
        },
        select: {
          link_avatar: true,
          name: true
        }
      });

      const check: Comment = await this.prisma.comment.findFirst({
        where: {
          id: comment_id
        }
      })

      const checkId: number = check.like.find((id: number) => id === user_id);

      if (checkId) {
        const updatedLike: number[] = check.like.filter((like) => like !== user_id);

        const comment: Comment = await this.prisma.comment.update({
          where: {
            id: comment_id,
          },
          data: {
            like: updatedLike,
          },
        });

        return { ...user, ...comment };
      } else {
        const updatedLike: number[] = [...check.like, user_id];

        const comment: Comment = await this.prisma.comment.update({
          where: {
            id: comment_id
          },
          data: {
            like: updatedLike
          }
        })

        return { ...user, ...comment };
      }
    } catch (e) {
      return console.log(e);
    }
  }
}