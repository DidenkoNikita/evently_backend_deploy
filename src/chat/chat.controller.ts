import { Body, Controller, Delete, Get, Post, Put, Res } from "@nestjs/common";
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
  stateData: {
    post_id: number;
    post_name: string;
    link_photo: string;
    text: string
  } | null
}

export interface UpdateMessage {
  id: number;
  user_id: number;
  userId: number
}

export interface DeleteChat {
  id: number;
  user_id: number;
}

export interface Data {
  user_id: number;
  brand_id: number;
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

  @Delete('/chats')
  async deleteChat(@Body() chatId: DeleteChat, @Res() res: Response) {
    const chat = await this.chatService.deleteChat(chatId);
    const userId = chat.users_id.find((c) => c !== chatId.user_id);
    const chats2 = await this.chatService.getChats(userId);
    console.log('чаты второго пользователя', chats2);
    
    this.chatGateway.sendChatDataToUser(userId.toString(), chats2)
    res.status(200).json(chat);
  }

  @Post('/get_chat_id')
  async getChatId(@Body() userData: UserData, @Res() res: Response) {    
    const chatId = await this.chatService.getChatId(userData);
    res.status(200).json(chatId);
  } 

  @Post('/messages')
  async createMessage(@Body() messageData: MessageData, @Res() res: Response) {
    const message = await this.chatGateway.createMessage(null, messageData);
    const chats1 = await this.chatService.getChats(messageData.user_id);
    const chats2 = await this.chatService.getChats(messageData.user2Id);
    console.log('chat2', chats2);
    
    this.chatGateway.sendMessageToUser(messageData.user2Id.toString(), messageData);
    this.chatGateway.sendUpdateChatToUser(messageData.user_id.toString(), chats1)
    this.chatGateway.sendChatDataToUser(messageData.user2Id.toString(), chats2)
    res.status(200).json(message);
  }

  @Post('/message_is_read')
  async messageIsRead(@Body() message: UpdateMessage, @Res() res: Response) {
    const messageIsRead = await this.chatService.markMessageAsRead(message);
    console.log(messageIsRead);
    this.chatGateway.sendUpdateMessageToUser(message.userId.toString(), messageIsRead);
    res.status(200).json(messageIsRead);
  }
}