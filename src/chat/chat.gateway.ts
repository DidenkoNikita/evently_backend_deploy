import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatDto, MessageData } from './chat.controller';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*'
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}
  @WebSocketServer()
  private server: Server;
  private userSockets: { [key: string]: Socket } = {};

  afterInit(server: Server) {
    console.log('Socket.IO сервер инициализирован!');
  }

  handleConnection(client: Socket) {
    console.log(`Клиент подключен: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Клиент отключен: ${client.id}`);
    const disconnectedUserId = Object.entries(this.userSockets).find(([userId, socket]) => socket === client)?.[0];
    if (disconnectedUserId) {
      delete this.userSockets[disconnectedUserId];
    }
  }

  @SubscribeMessage('getChats')
  async getChats(client: Socket, userId: string) {
    console.log('id', userId);

    this.userSockets[userId] = client;
    const chatData = await this.chatService.getChats(userId);
    const isConnected = !!this.userSockets[userId]; // Проверяем, подключен ли клиент к сокету
    client.emit('chatData', chatData);
    client.emit('userStatus', isConnected);
  }

  @SubscribeMessage('createChat')
  async createChat(client: Socket, chatData: ChatDto) {
    const chat = await this.chatService.createChat(chatData);

    const chats1 = await this.chatService.getChats(chatData.user1Id);
    const chats2 = await this.chatService.getChats(chatData.user2Id);

    const interlocutorId = chatData.user2Id.toString();
    this.sendChatDataToUser(interlocutorId, chats2);

    const userId = chatData.user1Id.toString();
    this.sendChatDataToUser(userId, chats1);

    return chat;
  }

  @SubscribeMessage('createMessage')
  async createMessage(client: Socket, messageData: MessageData) {
    const message = await this.chatService.createMessage(messageData);    
    this.sendMessageToUser(messageData.user2Id.toString(), message);
    this.server.emit('createMessage', message);

    this.chatService.markMessageAsRead(messageData.chatId, messageData.user2Id);
    return message;
  }

  sendChatData(chatData) {
    this.server.emit('chatData', chatData);
  }

  sendChatDataToUser(userId: string, chatData) {
    const userSocket = this.userSockets[userId];
    if (userSocket) {
      userSocket.emit('chatData', chatData);
    }
  }

  sendMessage(messageData) {
    this.server.emit('getMessageList', messageData);
  }

  sendMessageToUser(userId: string, messageData) {
    const userSocket = this.userSockets[userId];
    console.log('sendMessageToUser', messageData);
    if (userSocket) {
      userSocket.emit('createMessage', messageData);
    }
  }

  @SubscribeMessage('getMessageList')
  async getMessageList(client: Socket, chatId: number) {
    try {
      const messages = await this.chatService.getMessagesForChat(chatId);
      console.log(messages);
      
      client.emit('messageList', messages);
    } catch (error) {
      console.error('Ошибка при получении списка сообщений:', error);
      client.emit('messageListError', { error: 'Failed to get message list' });
    }
  }
}
