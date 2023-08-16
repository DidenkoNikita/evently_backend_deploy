import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { Confirm, Data, GetNotification, UpdateNotification, User } from "./interface";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async getNotification(data: GetNotification): Promise<void | UpdateNotification[]> {
    try {
      const notifications: Confirm[] = await this.prisma.request_for_friendship.findMany({
        where: {
          user_id: data.user_id
        }
      })

      const updateNotifications: UpdateNotification[] = await Promise.all(notifications.map(async (notification: any) => {
        const id = notification.creator_id;
        const [userData] = await this.prisma.user.findMany({
          where: {
            id
          },
          select: {
            name: true,
            link_avatar: true
          }
        })

        if (userData) {
          notification.name = userData.name;
          notification.link_avatar = userData.link_avatar;
          return notification;
        }

        return notification;
      }))

      return updateNotifications;
    } catch (e) {
      return console.log(e);
    }
  }

  async createNotification(data: Data): Promise<void | Confirm> {
    try {
      const checkNotification: Confirm = await this.prisma.request_for_friendship.findFirst({
        where: {
          creator_id: data.user_id,
          user_id: data.userId
        }
      })

      const user: User = await this.prisma.user.findUnique({
        where: {
          id: data.user_id
        },
        select: {
          friends_id: true
        }
      })

      const checkUser: number = user.friends_id.find((id) => id === data.userId);

      if (!checkNotification && !checkUser) {
        const notifiaction: Confirm = await this.prisma.request_for_friendship.create({
          data: {
            creator_id: data.user_id,
            user_id: data.userId
          }
        })

        return notifiaction;
      } else {
        return null;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async confirmNotification(data: Confirm): Promise<void | Confirm> {
    try {
      const userFirst: User = await this.prisma.user.findUnique({
        where: {
          id: data.user_id
        },
        select: {
          friends_id: true
        }
      })

      const checkUserFirst: number = userFirst.friends_id.find((id) => id === data.creator_id);

      if (!checkUserFirst) {
        await this.prisma.user.update({
          where: {
            id: data.user_id
          },
          data: {
            friends_id: [...userFirst.friends_id, data.creator_id]
          }
        });
      }

      const userSecond: User = await this.prisma.user.findUnique({
        where: {
          id: data.creator_id
        },
        select: {
          friends_id: true
        }
      })

      const checkUserSecond: number = userSecond.friends_id.find((id) => id === data.user_id);
      if (!checkUserSecond) {
        await this.prisma.user.update({
          where: {
            id: data.creator_id
          },
          data: {
            friends_id: [...userSecond.friends_id, data.user_id]
          }
        })
      }

      const notifiaction: Confirm = await this.prisma.request_for_friendship.delete({
        where: {
          id: data.id
        }
      })

      return notifiaction;
    } catch (e) {
      return console.log(e);
    }
  }

  async rejectNotifications(data: Confirm): Promise<void | Confirm> {
    try {
      const notifiaction: Confirm = await this.prisma.request_for_friendship.delete({
        where: {
          id: data.id
        }
      })

      return notifiaction;
    } catch (e) {
      return console.log(e);
    }
  }
}