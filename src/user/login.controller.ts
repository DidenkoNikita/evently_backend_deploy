import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginDto } from "./dto/user-login.dto";
import { LoginService } from "./login.service";

export interface User {
  id: number,
  accessToken: string
}

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {};

  @Post()
  login(@Body() userLoginDto) {
    try {
      const user = userLoginDto.user
      console.log(user);
      
      return this.loginService.signin(user)
    } catch(e) {
      console.log(e);
    }
  }
}