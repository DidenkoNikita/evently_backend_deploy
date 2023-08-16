import { Body, Controller, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { ReviewService } from "./review.service";
import { GetReview, Data, UpdateReview } from "./interface";

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post('/get_review')
  async getReview(@Body() data: GetReview, @Res() res: Response): Promise<void> {
    try {
      const reviewList: void | UpdateReview[] = await this.reviewService.getReview(data);
      res.status(200).json(reviewList);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/create_review')
  async createReview(@Body() data: Data, @Res() res: Response): Promise<void> {
    try {
      const review: void | UpdateReview = await this.reviewService.createReview(data);
      res.status(200).json(review);
    } catch (e) {
      return console.log(e);
    }
  }
}