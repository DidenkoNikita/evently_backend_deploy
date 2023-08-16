import { Body, Controller, Get, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { PostsSevice } from "./posts.srevice";
import { LikePostDto, PostI } from "./interface";

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsSevice) { }

  @Get()
  async posts(): Promise<void | { post: PostI[] }> {
    try {
      return await this.postsService.getPosts();
    } catch (e) {
      return console.log(e);
    }
  }

  @Post()
  async likePost(@Body() likePostDto: LikePostDto, @Res() res: Response): Promise<void> {
    try {
      const post = await this.postsService.likeAPost(likePostDto);
      res.status(200).json(post)
    } catch (e) {
      return console.log(e);
    }
  }
}