import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { PostsSevice } from "./posts.srevice";
import { Response } from "express";

export interface LikePostDto {
  user_id: number;
  post_id: number;
}

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsSevice) {}

  @Get()
  posts() {
    try {
      return this.postsService.getPosts();
    } catch(e) {
      return console.log(e);
    }
  }

  @Post()
  async likePost(@Body() likePostDto: LikePostDto, @Res() res: Response) {
    try {
      const post = await this.postsService.likeAPost(likePostDto);
      res.status(200).json(post)
    } catch(e) {
      return console.log(e);
    }
  }
}