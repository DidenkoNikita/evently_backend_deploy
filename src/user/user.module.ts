import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { PrismaClient } from "@prisma/client";

@Module({
  controllers: [SignupController, LoginController],
  providers: [LoginService, PrismaService, SignupService, PrismaClient],
})
export class UserModule {};