import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Chat, ChatData, ChatDto, ChatId, DeleteChat, IChat, Message, MessageData, UpdateMessage, User, UserData } from './interface';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async getChats(userId: number): Promise<void | Chat[]> {
    try {
      const chats: Chat[] = await this.prisma.chat.findMany({
        where: {
          users_id: {
            has: userId,
          },
        },
      });
      if (chats) {
        const updateChats: IChat[] = await Promise.all(chats.map(async (chat: any) => {
          const user_id: number = chat.users_id.find((id: number) => id !== userId);
          const userData: User = await this.prisma.user.findUnique({
            where: {
              id: user_id
            },
            select: {
              name: true,
              link_avatar: true
            }
          })

          const messages: Message[] = await this.prisma.message.findMany({
            where: {
              chat_id: chat.id
            }
          })
          const [message] = messages.sort((a, b) => a.id - b.id).slice(-1);
          const filterMessage = messages.filter((message) => message.user_id !== userId && !message.is_read);
          chat.name = userData.name;
          chat.link_avatar = userData.link_avatar;
          if (message) {
            const time: Date = new Date(message.created_at);
            chat.timeMessage = time;
            chat.textMessage = message?.text?.length >= 20 ? message?.text?.slice(0, 20) + '...' : message?.text;
            chat.isReadMessage = message.is_read;
            chat.userId = message.user_id;
            chat.unreadMessages = filterMessage.length;
            chat.postId = message.post_id;
          }
          return chat
        }))
        return updateChats;
      } else {
        return chats;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async createChat(chatData: ChatDto): Promise<void | ChatData> {
    try {
      const chat: Chat = await this.prisma.chat.create({
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
      const updateChat: ChatData = {
        id: chat.id,
        users_id: chat.users_id,
        name: user.name,
        link_avatar: user.link_avatar
      }

      return updateChat;
    } catch (e) {
      return console.log(e);
    }
  }

  async getChatId(userData: UserData): Promise<void | ChatId> {
    try {
      const chatId: ChatId = await this.prisma.chat.findFirst({
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
    } catch (e) {
      return console.log(e);
    }
  }

  async getMessagesForChat(chatId: number): Promise<void | Message[]> {
    try {
      const messages: Message[] = await this.prisma.message.findMany({
        where: {
          chat_id: chatId
        }
      })

      return messages;
    } catch (e) {
      return console.log(e);
    }
  }

  async createMessage(messageData: MessageData): Promise<void | Message> {
    try {
      if (messageData.postId) {
        const message: Message = await this.prisma.message.create({
          data: {
            user_id: messageData.user_id,
            chat_id: messageData.chatId,
            post_id: messageData.postId
          }
        })
        return message;
      } else {
        const message: Message = await this.prisma.message.create({
          data: {
            user_id: messageData.user_id,
            text: messageData.text,
            chat_id: messageData.chatId
          }
        })
        return message;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async markMessageAsRead(message: UpdateMessage): Promise<void | Message> {
    try {
      return await this.prisma.message.update({
        where: {
          id: message.id
        },
        data: {
          is_read: true
        }
      });
    } catch (e) {
      return console.log(e);
    }
  }

  async deleteChat(chatId: DeleteChat): Promise<void | Chat> {
    try {
      const chat: Chat = await this.prisma.chat.delete({
        where: {
          id: chatId.id
        }
      })

      const messages: Message[] = await this.prisma.message.findMany({
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

      return chat;
    } catch (e) {
      return console.log(e);
    }
  }
}
