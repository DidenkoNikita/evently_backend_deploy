import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";
import { passwordHashing } from "src/service/password-hashing";
import { UserDto } from "./dto/user.dto";
import { User } from "./signup.controller";

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {};

  async createUser(user) {
    const passwordHash = await passwordHashing(user.user.password);
    user.user.password = passwordHash;
    const dataUser = user.user
    console.log(dataUser);
    
    const userData = await this.prisma.user.create({
      data: {
        ...dataUser
      }
    })
    const userCategories = await this.prisma.user_categories.create({
      data: {
        user_id: userData.id,
        ...user.user_categories
      }
    })
    const userMood = await this.prisma.user_mood.create({
      data: {
        user_id: userData.id,
        ...user.user_mood
      }
    })

    const accessToken = generateAccessToken({ name: user.user.name });
    const refreshToken = generateRefreshToken({ id: user.id });
    console.log(accessToken, refreshToken);

    await this.prisma.token.create({
      data: {
        user_id: userData.id,
        refresh_token: refreshToken
      }
    })
    const id = userData.id;
    
    return {id, accessToken};
  }
}