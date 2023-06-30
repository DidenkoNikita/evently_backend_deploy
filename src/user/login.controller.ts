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
  login(@Body() userLoginDto: UserLoginDto): Promise<User> {
    try {
      return this.loginService.signin(userLoginDto)
    } catch(e) {
      console.log(e);
    }
  }
}