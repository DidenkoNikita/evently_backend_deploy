import { Body, Controller, Delete, Post, Res } from "@nestjs/common";

import { Response } from "express";

import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { Chat, ChatData, ChatDto, ChatId, DeleteChat, Message, MessageData, UpdateMessage, UserData } from "./interface";

@Controller()
export class ChatController {
  constructor(
    private readonly chatGateway: ChatGateway,
    private readonly chatService: ChatService
  ) { }

  @Post('/chats')
  async createChat(@Body() chatData: ChatDto, @Res() res: Response): Promise<void> {
    try {
      const chat: void | ChatData = await this.chatGateway.createChat(null, chatData);
      res.status(200).json(chat);
    } catch (e) {
      return console.log(e);

    }
  }

  @Delete('/chats')
  async deleteChat(@Body() chatId: DeleteChat, @Res() res: Response): Promise<void> {
    try {
      const chat: void | Chat = await this.chatService.deleteChat(chatId);
      const userId: number = chat['users_id'].find((c) => c !== chatId.user_id);
      const chats2: void | Chat[] = await this.chatService.getChats(userId);
      this.chatGateway.sendChatDataToUser(userId.toString(), chats2);
      res.status(200).json(chat);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/get_chat_id')
  async getChatId(@Body() userData: UserData, @Res() res: Response): Promise<void> {
    try {
      const chatId: void | ChatId = await this.chatService.getChatId(userData);
      res.status(200).json(chatId);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/messages')
  async createMessage(@Body() messageData: MessageData, @Res() res: Response): Promise<void> {
    try {
      const message: void | Message = await this.chatGateway.createMessage(null, messageData);
      const chats1: void | Chat[] = await this.chatService.getChats(messageData.user_id);
      const chats2: void | Chat[] = await this.chatService.getChats(messageData.user2Id);
      this.chatGateway.sendMessageToUser(messageData.user2Id.toString(), messageData);
      this.chatGateway.sendUpdateChatToUser(messageData.user_id.toString(), chats1);
      this.chatGateway.sendChatDataToUser(messageData.user2Id.toString(), chats2);
      res.status(200).json(message);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/message_is_read')
  async messageIsRead(@Body() message: UpdateMessage, @Res() res: Response): Promise<void> {
    try {
      const messageIsRead: Message | void = await this.chatService.markMessageAsRead(message);
      this.chatGateway.sendUpdateMessageToUser(message.userId.toString(), messageIsRead);
      res.status(200).json(messageIsRead);
    } catch (e) {
      return console.log(e);
    }
  }
}