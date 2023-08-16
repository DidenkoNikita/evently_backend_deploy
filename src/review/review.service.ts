import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { Data, GetReview, Review, UpdateReview, User } from "./interface";

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) { }

  async getReview(data: GetReview): Promise<void | UpdateReview[]> {
    try {
      const reviews: Review[] = await this.prisma.review.findMany();

      const updatedReviews: UpdateReview[] = await Promise.all(reviews.map(async (review: any) => {
        const user: User = await this.prisma.user.findUnique({
          where: {
            id: review.user_id
          },
          select: {
            link_avatar: true,
            name: true
          }
        })
        review.link_avatar = user.link_avatar;
        review.name = user.name;
        return review;
      }))

      return updatedReviews;
    } catch (e) {
      return console.log(e);
    }
  }

  async createReview(data: Data): Promise<void | UpdateReview> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: data.user_id
        },
        select: {
          link_avatar: true,
          name: true
        }
      })

      const review: Review = await this.prisma.review.create({
        data: {
          user_id: data.user_id,
          grade: data.grade,
          text: data.text,
          brand_id: data.brand_id
        }
      })
      return { ...user, ...review }
    } catch (e) {
      return console.log(e);
    }
  }
}