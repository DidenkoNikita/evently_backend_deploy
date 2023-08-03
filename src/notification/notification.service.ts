import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Confirm, GetNotification } from "./notification.controller";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}
  async getNotification(data: GetNotification) {
    const notifications = await this.prisma.request_for_friendship.findMany({
      where: {
        user_id: data.user_id
      }
    })

    console.log(notifications);
    

    const updateNotifications = await Promise.all(notifications.map(async (notification: any) => {
      const id = notification.creator_id;
      console.log(id);
      
      const [userData] = await this.prisma.user.findMany({
        where: {
          id
        },
        select: {
          name: true,
          link_avatar: true
        }
      })

      console.log(userData);
      
      if (userData) {
        notification.name = userData.name;
        notification.link_avatar = userData.link_avatar;
        return notification;
      }

      return notification;
    }))

    console.log('updateNotifications',updateNotifications);
    
    return updateNotifications;
  }

  async createNotification(data) {
    const checkNotification = await this.prisma.request_for_friendship.findFirst({
      where: {
        creator_id: data.user_id,
        user_id: data.userId
      }
    })

    const user = await this.prisma.user.findUnique({
      where: {
        id: data.user_id
      },
      select: {
        friends_id: true
      }
    })

    const checkUser = user.friends_id.find((id) => id === data.userId);

    if (!checkNotification && !checkUser) {
      const notifiaction = await this.prisma.request_for_friendship.create({
        data: {
          creator_id: data.user_id,
          user_id: data.userId
        }
      })
      
      return notifiaction;
    } else {
      return null;
    }
  }

  async confirmNotification(data: Confirm) {
    console.log('kmlsmdmld', data);
    
    const userFirst = await this.prisma.user.findUnique({
      where: {
        id: data.user_id
      },
      select: {
        friends_id: true
      }
    })

    const checkUserFirst = userFirst.friends_id.find((id) => id === data.creator_id);
    console.log(typeof checkUserFirst);
    

    if (!checkUserFirst) {
      console.log('aboba');
      
      await this.prisma.user.update({
        where: {
          id: data.user_id
        },
        data: {
          friends_id: [...userFirst.friends_id, data.creator_id]
        }
      });
    }

    const userSecond = await this.prisma.user.findUnique({
      where: {
        id: data.creator_id
      },
      select: {
        friends_id: true
      }
    })

    const checkUserSecond = userSecond.friends_id.find((id) => id === data.user_id);
    console.log(typeof checkUserSecond);
    
    if (!checkUserSecond) {
      console.log('kabuka');
      
      await this.prisma.user.update({
        where: {
          id: data.creator_id
        },
        data: {
          friends_id: [...userSecond.friends_id, data.user_id]
        }
      })
    }

    const notifiaction = await this.prisma.request_for_friendship.delete({
      where: {
        id: data.id
      }
    })
    
    return notifiaction;
  }

  async rejectNotifications(data: Confirm) {
    const notifiaction = await this.prisma.request_for_friendship.delete({
      where: {
        id: data.id
      }
    })
    
    return notifiaction;
  }
}