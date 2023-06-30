import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { generateAccessToken, generateRefreshToken } from "src/service/generate-token";
import { passwordHashing } from "src/service/password-hashing";
import { UserDto } from "./dto/user.dto";
import { User } from "./login.controller";

@Injectable()
export class SignupService {
  constructor(private prisma: PrismaService) {};

  async createUser(userDto: UserDto): Promise<User> {
    const passwordHash = await passwordHashing(userDto.user.password);
    console.log(passwordHash);
    userDto.user.password = passwordHash;
    const user = await this.prisma.user.create({
      data: {
        ...userDto.user
      }
    })
    const userCategories = await this.prisma.user_categories.create({
      data: {
        user_id: user.id,
        ...userDto.userCategories
      }
    })
    const userMood = await this.prisma.user_mood.create({
      data: {
        user_id: user.id,
        ...userDto.userMood
      }
    })

    const accessToken = generateAccessToken({ name: userDto.user.name });
    const refreshToken = generateRefreshToken({ id: user.id });
    console.log(accessToken, refreshToken);

    await this.prisma.token.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken
      }
    })
    const id = user.id
    return {id, accessToken};
  }
}