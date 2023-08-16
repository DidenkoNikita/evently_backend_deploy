import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { Data, Id, Number, User } from './interface';
import { generateAccessToken, generateRefreshToken } from './service/generate-token';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async checkNumber(number: Number): Promise<boolean | void> {
    try {
      const numb = await this.prisma.user.findUnique({
        where: {
          phone: number.toString()
        }
      })

      if (numb) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async signin(id: Id): Promise<void | Data> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id.user_id
        },
        select: {
          id: true,
          name: true
        }
      })
      if (user) {
        const refreshToken: string = generateRefreshToken({ id: user.id });
        const accessToken: string = generateAccessToken({ name: user.name });

        await this.prisma.token.upsert({
          where: {
            user_id: user.id
          },
          update: {
            refresh_token: refreshToken
          },
          create: {
            user_id: user.id,
            refresh_token: refreshToken
          }
        })
        const id: number = user.id

        return { id, accessToken };
      } else {
        throw new Error();
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async delete(): Promise<void> {
    try {
      await this.prisma.user.deleteMany();
      await this.prisma.token.deleteMany();
      await this.prisma.user_mood.deleteMany();
      await this.prisma.user_categories.deleteMany();
    } catch (e) {
      return console.log(e);
    }
  }
}
