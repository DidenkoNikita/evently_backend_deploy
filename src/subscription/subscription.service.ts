import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Data, GetSubscribtion } from "./subscription.controller";

@Injectable()
export class SubscribtionService {
  constructor(private prisma: PrismaService) {}

  async getSubscription(data: GetSubscribtion) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        user_id: data.user_id,
      }
    })

    const updateSubscriptions = await Promise.all(subscriptions.map(async (subscription: any) => {
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: subscription.brand_id
        },
        select: {
          link_photo: true,
          name: true,
          type: true
        }
      })
      subscription.link_photo = brand.link_photo;
      subscription.name = brand.name;
      subscription.type = brand.type;
      return subscription
    }))
    return updateSubscriptions;
  }

  async createSubscription(data: Data) {
    const checkSubscription = await this.prisma.subscription.findFirst({
      where: {
        user_id: data.user_id,
        brand_id: data.brand_id
      }
    })
    if (!checkSubscription) {
      const subscription = await this.prisma.subscription.create({
        data: {
          user_id: data.user_id,
          brand_id: data.brand_id
        }
      })
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: subscription.brand_id
        },
        select: {
          link_photo: true,
          name: true,
          type: true
        }
      })

      return {...subscription, ...brand};
    }
  }

  
  async removeSubscription(data: Data) {
    const checkSubscription = await this.prisma.subscription.findFirst({
      where: {
        user_id: data.user_id,
        brand_id: data.brand_id
      }
    })
    console.log('checkSubscription',checkSubscription);
    
    if (checkSubscription) {
      const subscription = await this.prisma.subscription.delete({
        where: {
          id: checkSubscription.id
        }
      })
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: subscription.brand_id
        },
        select: {
          link_photo: true,
          name: true,
          type: true
        }
      })

      return {...subscription, ...brand};
    }
  }
}