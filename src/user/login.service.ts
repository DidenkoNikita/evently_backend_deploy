import { Injectable } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

import { passwordVerifying } from "src/service/password-hashing";
import { Login, ReturnLogin, UpdateUser, User } from "./interface";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaClient) { };

  async signin(userLoginDto: Login): Promise<void | ReturnLogin> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          phone: userLoginDto.phone
        },
        select: {
          id: true,
          password: true,
          name: true
        }
      })
      const verifyPassword = await passwordVerifying(user.password, userLoginDto.password);
      if (user && verifyPassword) {
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
  
        const updatedUser: UpdateUser = await this.prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            color_theme: userLoginDto.color_theme
          },
          select: {
            color_theme: true
          }
        })
        const id = user.id
  
        return { 
          id, 
          accessToken, 
          color_theme: updatedUser.color_theme 
        };
      } else {
        throw new Error();
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async signinWithRememberMe(userLoginDto: Login): Promise<void | ReturnLogin> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          phone: userLoginDto.phone
        },
        select: {
          id: true,
          password: true,
          name: true
        }
      })
      const verifyPassword = await passwordVerifying(user.password, userLoginDto.password);
      if (user && verifyPassword) {
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
        const updatedUser: UpdateUser = await this.prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            color_theme: userLoginDto.color_theme
          },
          select: {
            color_theme: true
          }
        })
        const id = user.id
  
        return { 
          id, 
          accessToken, 
          refreshToken, 
          color_theme: updatedUser.color_theme 
        };
      } else {
        throw new Error();
      }
    } catch (e) {
      return console.log(e);
    }
  }
}