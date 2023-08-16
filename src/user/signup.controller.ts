import { Body, Controller, Post } from "@nestjs/common";

import { SignupService } from "./signup.service";
import { Registration, ReturnLogin, UserData } from "./interface";

@Controller()
export class SignupController {
  constructor(private readonly signupService: SignupService) { };

  @Post('/signup')
  createUser(@Body() userDto: Registration): void | Promise<void | ReturnLogin> {
    try {
      const user: UserData = userDto.user;
      return this.signupService.createUser(user);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/signup_remember_me')
  createUserWithRememberMe(@Body() userDto: Registration): void | Promise<void | ReturnLogin> {
    try {
      const user: UserData = userDto.user;
      return this.signupService.createUserWithRememberMe(user);
    } catch (e) {
      return console.log(e);
    }
  }

}