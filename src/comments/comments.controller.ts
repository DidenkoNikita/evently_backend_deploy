import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";

import { Response } from "express";

import { CommentsService } from "./comments.service";
import { CommentDto, LikeCommentDto, UpdateComment } from "./interface";

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get()
  async comments(): Promise<void | UpdateComment[]> {
    try {
      return await this.commentsService.getComments();
    } catch (e) {
      return console.log(e);
    }
  }

  @Post()
  async createComment(@Body() comment: CommentDto, @Res() res: Response): Promise<void> {
    try {
      const comm: void | UpdateComment = await this.commentsService.createComment(comment);
      res.status(200).json(comm);
    } catch (e) {
      return console.log(e);
    }
  }

  @Put()
  async likeComment(@Body() comment: LikeCommentDto, @Res() res: Response): Promise<void> {
    try {
      const comm: void | UpdateComment = await this.commentsService.likeComment(comment);
      res.status(200).json(comm);
    } catch (e) {
      return console.log(e);
    }
  }
}