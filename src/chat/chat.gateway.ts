import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

import { ChatService } from './chat.service';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Chat, ChatData, ChatDto, Message, MessageData } from './interface';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) { }
  @WebSocketServer()
  private server: Server;
  private userSockets: { [key: string]: Socket } = {};

  afterInit(server: Server): void {
    console.log('Socket.IO server initialized!');
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    const disconnectedUserId = Object.entries(this.userSockets).find(([userId, socket]) => socket === client)?.[0];
    if (disconnectedUserId) {
      delete this.userSockets[disconnectedUserId];
    }
  }

  @SubscribeMessage('getChats')
  async getChats(client: Socket, userId: number): Promise<void> {
    try {
      this.userSockets[userId] = client;
      const chatData = await this.chatService.getChats(userId);
      const isConnected: boolean = !!this.userSockets[userId];
      client.emit('chatData', chatData);
      client.emit('userStatus', isConnected);
    } catch (e) {
      return console.log(e);
    }
  }

  @SubscribeMessage('createChat')
  async createChat(client: Socket, chatData: ChatDto): Promise<ChatData | void> {
    try {
      const chat: ChatData | void = await this.chatService.createChat(chatData);

      const chats1 = await this.chatService.getChats(chatData.user1Id);
      const chats2 = await this.chatService.getChats(chatData.user2Id);

      const interlocutorId: string = chatData.user2Id.toString();
      this.sendChatDataToUser(interlocutorId, chats2);

      const userId: string = chatData.user1Id.toString();
      this.sendChatDataToUser(userId, chats1);

      return chat;
    } catch (e) {
      return console.log(e);
    }
  }

  @SubscribeMessage('createMessage')
  async createMessage(client: Socket, messageData: MessageData): Promise<Message | void> {
    try {
      const message: void | Message = await this.chatService.createMessage(messageData);
      this.sendMessageToUser(messageData.user2Id.toString(), message);
      const userSocket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = this.userSockets[messageData.user2Id];

      if (userSocket) {
        this.server.emit('createMessage', message);
        return message
      } else {
        this.server.emit('createMessage', message);
        return message;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  sendChatData(chatData: ChatDto): void {
    this.server.emit('chatData', chatData);
  }

  sendChatDataToUser(userId: string, chatData: void | Chat[]): void {
    const userSocket = this.userSockets[userId];
    if (userSocket) {
      userSocket.emit('chatData', chatData);
    }
  }

  sendUpdateChatToUser(userId: string, chatData: void | Chat[]): void {
    const userSocket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = this.userSockets[userId];
    if (userSocket) {
      userSocket.emit('updateChat', chatData);
    }
  }

  sendMessage(messageData: MessageData): void {
    this.server.emit('getMessageList', messageData);
  }

  async sendMessageToUser(userId: string, messageData: void | Message | MessageData): Promise<void> {
    try {
      const userSocket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = this.userSockets[userId];
      if (userSocket) {
        userSocket.emit('createMessage', messageData);
      }
    } catch (e) {
      return console.log(e);
    }
  }

  sendUpdateMessageToUser(userId: string, messageData: Message | void): void {
    const userSocket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> = this.userSockets[userId];

    if (userSocket) {
      userSocket.emit('messageIsRead', messageData);
    }
  }

  @SubscribeMessage('getMessageList')
  async getMessageList(client: Socket, chatId: number): Promise<void> {
    try {
      const messages = await this.chatService.getMessagesForChat(chatId);
      client.emit('messageList', messages);
    } catch (e) {
      client.emit('messageListError', { error: 'Failed to get message list' });
      return console.log(e);
    }
  }
}