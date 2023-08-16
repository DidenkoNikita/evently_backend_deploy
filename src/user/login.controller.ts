import { Body, Controller, Post } from "@nestjs/common";

import { LoginService } from "./login.service";
import { LoginI, ReturnLogin } from "./interface";

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) { };

  @Post('login')
  login(@Body() userLoginDto: LoginI): void | Promise<void | ReturnLogin> {
    try {
      const user = userLoginDto.user;
      return this.loginService.signin(user)
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('login_remember_me')
  loginWithRememberMe(@Body() userLoginDto: LoginI): void | Promise<void | ReturnLogin> {
    try {
      const user = userLoginDto.user;
      return this.loginService.signinWithRememberMe(user)
    } catch (e) {
      return console.log(e);
    }
  }
}