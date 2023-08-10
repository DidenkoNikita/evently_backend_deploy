import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Data, GetReview } from "./review.controller";

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReview(data: GetReview) {
    const reviews = await this.prisma.review.findMany();

    const updatedReviews = await Promise.all(reviews.map(async (review: any) => {
      const user = await this.prisma.user.findUnique({
        where: {
          id: review.user_id
        },
        select: {
          link_avatar: true,
          name: true
        }
      })
      review.link_avatar = user.link_avatar;
      review.user_name = user.name;
      return review;
    }))

    return updatedReviews;
  }

  async createReview(data: Data) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.user_id
      },
      select: {
        link_avatar: true,
        name: true
      }
    })

    const review = await this.prisma.review.create({
      data: {
        user_id: data.user_id,
        grade: data.grade,
        text: data.text,
        brand_id: data.brand_id
      }
    })
    return {...user, ...review}
  }
}