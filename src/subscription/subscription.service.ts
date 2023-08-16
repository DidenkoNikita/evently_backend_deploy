import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { Brand, Data, GetSubscribtion, Subscription, UpdateSubscription } from "./interface";

@Injectable()
export class SubscribtionService {
  constructor(private prisma: PrismaService) { }

  async getSubscription(data: GetSubscribtion): Promise<void | UpdateSubscription[]> {
    try {
      const subscriptions: Subscription[] = await this.prisma.subscription.findMany({
        where: {
          user_id: data.user_id,
        }
      })
  
      const updateSubscriptions: UpdateSubscription[] = await Promise.all(subscriptions.map(async (subscription: any) => {
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
  
        return subscription;
      }))
      return updateSubscriptions;
    } catch (e) {
      return console.log(e);
    }
  }

  async createSubscription(data: Data): Promise<void | UpdateSubscription> {
    try {
      const checkSubscription: Subscription = await this.prisma.subscription.findFirst({
        where: {
          user_id: data.user_id,
          brand_id: data.brand_id
        }
      })
      if (!checkSubscription) {
        const subscription: Subscription = await this.prisma.subscription.create({
          data: {
            user_id: data.user_id,
            brand_id: data.brand_id
          }
        })
        const brand: Brand = await this.prisma.brand.findUnique({
          where: {
            id: subscription.brand_id
          },
          select: {
            link_photo: true,
            name: true,
            type: true
          }
        })
  
        return { ...subscription, ...brand };
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async removeSubscription(data: Data): Promise<void | UpdateSubscription> {
    try {
      const checkSubscription: Subscription = await this.prisma.subscription.findFirst({
        where: {
          user_id: data.user_id,
          brand_id: data.brand_id
        }
      })
  
      if (checkSubscription) {
        const subscription: Subscription = await this.prisma.subscription.delete({
          where: {
            id: checkSubscription.id
          }
        })
        const brand: Brand = await this.prisma.brand.findUnique({
          where: {
            id: subscription.brand_id
          },
          select: {
            link_photo: true,
            name: true,
            type: true
          }
        })
  
        return { ...subscription, ...brand };
      }
    } catch (e) {
      return console.log(e);
    }
  }
}