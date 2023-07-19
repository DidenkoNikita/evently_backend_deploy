import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { UserLoginDto } from "./dto/user-login.dto";
import { passwordVerifying } from "src/service/password-hashing";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";
import { User } from "./login.controller";

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
    console.log(verifyPassword);
    if (user && verifyPassword) {
      const refreshToken = generateRefreshToken({id: user.id});
      const accessToken = generateAccessToken({name: user.name})
      console.log(accessToken, '---------------------', refreshToken);
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

      return {id, accessToken};
    } else {
      throw new Error();
    }
  }
}