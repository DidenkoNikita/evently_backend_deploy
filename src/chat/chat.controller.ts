import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";
import { Response } from "express";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";

export interface ChatDto {
  user1Id: number;
  user2Id: number;
}

export interface UserData {
  user_id: number;
  user2Id: number;
}

export interface MessageData {
  text: string;
  user_id: number;
  chatId: number;
  user2Id: number;
}

@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway
  ) {}

  @Post('/chats')
  async createChat(@Body() chatData: ChatDto, @Res() res: Response) {
    const chat = await this.chatGateway.createChat(null, chatData);
    res.status(200).json(chat);
  }

  @Post('/get_chat_id')
  async getChatId(@Body() userData: UserData, @Res() res: Response) {
    console.log('user data', userData);
    
    const chatId = await this.chatService.getChatId(userData);
    res.status(200).json(chatId);
  } 

  @Post('/messages')
  async createMessage(@Body() messageData: MessageData, @Res() res: Response) {
    console.log('message', messageData);
    const message = await this.chatGateway.createMessage(null, messageData);
    this.chatGateway.sendMessageToUser(messageData.user2Id.toString(), messageData);
    res.status(200).json(message);
  }
}