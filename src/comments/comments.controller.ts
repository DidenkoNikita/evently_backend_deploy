import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { Response } from "express";

export interface CommentDto {
  user_id: number;
  post_id: number;
  text: string;
}

export interface LikeCommentDto {
  user_id: number;
  comment_id: number;
}

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentsService : CommentsService) {}

  @Get()
  comments() {
    try {
      return this.commentsService.getComments();
    } catch(e) {
      return console.log(e);
    }
  }

  @Post()
  async createComment(@Body() comment: CommentDto, @Res() res: Response) {
    const post = await this.commentsService.createComment(comment);
    res.status(200).json(post);
  }

  @Put()
  async likeComment(@Body() comment: LikeCommentDto, @Res() res: Response) {
    const post = await this.commentsService.likeComment(comment);
    res.status(200).json(post)
  }
}