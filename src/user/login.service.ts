import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserLoginDto } from "./dto/user-login.dto";
import { passwordVerifying } from "src/service/password-hashing";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";

@Injectable() 
export class LoginService {
  constructor(private prisma: PrismaClient) {};

  async signin(userLoginDto: UserLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: userLoginDto.phone
      }
    })
    const verifyPassword = await passwordVerifying(user.password, userLoginDto.password);
    if (user && verifyPassword) {
      const refreshToken = generateRefreshToken({id: user.id});
      const accessToken = generateAccessToken({name: user.name})
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
      const id = user.id

      return {id, accessToken, color_theme: user.color_theme};
    } else {
      throw new Error();
    }
  }

  async signinWithRememberMe(userLoginDto: UserLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: userLoginDto.phone
      }
    })
    const verifyPassword = await passwordVerifying(user.password, userLoginDto.password);
    if (user && verifyPassword) {
      const refreshToken = generateRefreshToken({id: user.id});
      const accessToken = generateAccessToken({name: user.name})
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
      const id = user.id

      return {id, accessToken, refreshToken, color_theme: user.color_theme};
    } else {
      throw new Error();
    }
  }
}