import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ReviewService } from "./review.service";

export interface Data {
  user_id: number;
  grade: number;
  text: string;
  brand_id: number;
}

export interface GetReview {
  user_id: number;
} 

@Controller()
export class ReviewController {
  constructor (private readonly reviewService: ReviewService) {}

  @Post('/get_review')
  async getReview(@Body() data: GetReview, @Res() res: Response) {
    try {
      const reviewList = await this.reviewService.getReview(data);
      res.status(200).json(reviewList);
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('/create_review')
  async createReview(@Body() data: Data, @Res() res: Response) {
    try {
      const review = await this.reviewService.createReview(data);
      res.status(200).json(review);
    } catch(e) {
      return console.log(e);
    }
  }
}