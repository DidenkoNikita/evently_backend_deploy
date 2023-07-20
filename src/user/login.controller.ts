import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDto } from "./dto/user-login.dto";
import { LoginService } from "./login.service";

export interface User {
  id: number,
  accessToken: string
}

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {};

  @Post('login')
  login(@Body() userLoginDto) {
    try {
      const user = userLoginDto.user      
      return this.loginService.signin(user)
    } catch(e) {
      return console.log(e);
    }
  }

  @Post('login_remember_me')
  loginWithRememberMe(@Body() userLoginDto) {
    try {
      const user = userLoginDto.user      
      return this.loginService.signinWithRememberMe(user)
    } catch(e) {
      return console.log(e);
    }
  }
}