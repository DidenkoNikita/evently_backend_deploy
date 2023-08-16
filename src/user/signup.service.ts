import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/prisma.service";
import { passwordHashing } from "src/service/password-hashing";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";
import { Data, DataUser, ReturnLogin, UserData } from "./interface";

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) { };

  async createUser(user: UserData): Promise<void | ReturnLogin> {
    try {
      const passwordHash: string = await passwordHashing(user.user.password);
      user.user.password = passwordHash;
      const dataUser: DataUser = user.user;

      const userData: Data = await this.prisma.user.create({
        data: {
          ...dataUser
        },
        select: {
          id: true,
          name: true,
          color_theme: true
        }
      })
      await this.prisma.user_categories.create({
        data: {
          user_id: userData.id,
          ...user.user_categories
        }
      })
      await this.prisma.user_mood.create({
        data: {
          user_id: userData.id,
          ...user.user_mood
        }
      })

      await this.prisma.phone_confidentiality.create({
        data: {
          user_id: userData.id
        }
      })

      await this.prisma.message_confidentiality.create({
        data: {
          user_id: userData.id
        }
      })

      const accessToken: string = generateAccessToken({ name: user.user.name });
      const refreshToken: string = generateRefreshToken({ id: userData.id });

      await this.prisma.token.create({
        data: {
          user_id: userData.id,
          refresh_token: refreshToken
        }
      })
      const id = userData.id;

      return { 
        id, 
        accessToken, 
        color_theme: userData.color_theme 
      };
    } catch (e) {
      return console.log(e);
    }
  }

  async createUserWithRememberMe(user: UserData): Promise<void | ReturnLogin> {
    try {
      const passwordHash: string = await passwordHashing(user.user.password);
      user.user.password = passwordHash;
      const dataUser: DataUser = user.user

      const userData: Data = await this.prisma.user.create({
        data: {
          ...dataUser
        },
        select: {
          id: true,
          name: true,
          color_theme: true
        }
      })
      await this.prisma.user_categories.create({
        data: {
          user_id: userData.id,
          ...user.user_categories
        }
      })
      await this.prisma.user_mood.create({
        data: {
          user_id: userData.id,
          ...user.user_mood
        }
      })

      await this.prisma.phone_confidentiality.create({
        data: {
          user_id: userData.id
        }
      })

      await this.prisma.message_confidentiality.create({
        data: {
          user_id: userData.id
        }
      })

      const accessToken: string = generateAccessToken({ name: user.user.name });
      const refreshToken: string = generateRefreshToken({ id: userData.id });

      await this.prisma.token.create({
        data: {
          user_id: userData.id,
          refresh_token: refreshToken
        }
      })
      const id = userData.id;

      return { 
        id, 
        accessToken, 
        refreshToken, 
        color_theme: userData.color_theme 
      };
    } catch (e) {
      return console.log(e);
    }
  }
}