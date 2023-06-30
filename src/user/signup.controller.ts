import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { SignupService } from "./signup.service";
import { User } from "./login.controller";

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {};

  @Post()
  createUser(@Body() userDto: UserDto): Promise<User> {
    try {
      return this.signupService.createUser(userDto);
    } catch(e) {
     console.log(e);
    }
  }

}