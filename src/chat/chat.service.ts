import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatDto, Data, DeleteChat, MessageData, UpdateMessage, UserData } from './chat.controller';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async getChats(userId) {
    const chats = await this.prisma.chat.findMany({
      where: {
        users_id: {
          has: userId,
        },
      },
    });
    if (chats) {
      const updateChats = await Promise.all(chats.map(async (chat: any) => {
        const user_id = chat.users_id.find((id) => id !== userId)
        const userData = await this.prisma.user.findUnique({
          where: {
            id: user_id
          },
          select: {
            name: true,
            link_avatar: true
          }
        })

        const messages = await this.prisma.message.findMany({
          where: {
            chat_id: chat.id
          }
        })
        const [message] = messages.sort((a, b) => a.id - b.id).slice(-1);
        const filterMessage = messages.filter((message) => message.user_id !== userId && !message.is_read);
        console.log(filterMessage);

        chat.name = userData.name;
        chat.link_avatar = userData.link_avatar;
        if (message) {
          const time = new Date(message.created_at);
          // const formatNumber = (num: number) => {
          //   return num.toString().padStart(2, '0');
          // };
          // chat.timeMessage = `${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`;
          chat.timeMessage = time
          chat.textMessage = message.text.length >= 20 ? message.text.slice(0, 20) + '...' : message.text
          chat.isReadMessage = message.is_read;
          chat.userId = message.user_id;
          chat.unreadMessages = filterMessage.length;
        }
        return chat
      }))
      return updateChats;
    } else {
      return chats;
    }
  }

  async createChat(chatData: ChatDto) {
    const chat = await this.prisma.chat.create({
      data: {
        users_id: [chatData.user1Id, chatData.user2Id]
      }
    })
    const user = await this.prisma.user.findUnique({
      where: {
        id: chatData.user2Id
      },
      select: {
        name: true,
        link_avatar: true
      }
    })
    const updateChat = {
      id: chat.id,
      users_id: chat.users_id,
      name: user.name,
      link_avatar: user.link_avatar
    }

    return updateChat;
  }

  async getChatId(userData: UserData) {
    const chatId = await this.prisma.chat.findFirst({
      where: {
        users_id: {
          hasEvery: [userData.user_id, userData.user2Id],
        },
      },
      select: {
        id: true
      }
    });
    return chatId;
  }

  async getMessagesForChat(chatId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        chat_id: chatId
      }
    })

    return messages;
  }

  async createMessage(messageData: MessageData) {
    if (messageData.stateData) {
      const message = await this.prisma.message.create({
        data: {
          user_id: messageData.user_id,
          text: messageData.stateData.text,
          chat_id: messageData.chatId,
          post_name: messageData.stateData.post_name,
          link_photo: messageData.stateData.link_photo,
          post_id: messageData.stateData.post_id
        }
      })
      console.log('create message', message);

      return message;
    } else {
      const message = await this.prisma.message.create({
        data: {
          user_id: messageData.user_id,
          text: messageData.text,
          chat_id: messageData.chatId
        }
      })
      console.log('create message', message);

      return message;
    }

  }

  async markMessageAsRead(message: UpdateMessage) {
    return await this.prisma.message.update({
      where: {
        id: message.id
      },
      data: {
        is_read: true
      }
    });
  }

  async deleteChat(chatId: DeleteChat) {
    const chat = await this.prisma.chat.delete({
      where: {
        id: chatId.id
      }
    })

    const messages = await this.prisma.message.findMany({
      where: {
        chat_id: chatId.id
      }
    })

    if (messages) {
      await this.prisma.message.deleteMany({
        where: {
          chat_id: chatId.id
        }
      })
    }

    return chat
  }
}
