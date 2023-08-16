import { Injectable } from '@nestjs/common';

import { Token, User } from './interface';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) { }

  async findTokenByUserId(userId: number): Promise<{ refresh_token: string } | null> {
    try {
      const token: Token = await this.prisma.token.findUnique({
        where: {
          user_id: userId,
        },
        select: {
          refresh_token: true,
        },
      });
      return token;
    } catch (e) {
      return null;
    }
  }

  async findUserById(userId: number): Promise<{ name: string } | null> {
    try {
      const user: User = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          name: true,
        },
      });
      return user;
    } catch (e) {
      return null;
    }
  }
}