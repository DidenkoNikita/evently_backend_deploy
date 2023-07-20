import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { SignupService } from "./signup.service";
// import { User } from "./login.controller";

export interface User {
  user: {
    phone: string;
    name: string;
    date_of_birth: string
    gender: string;
    password: string;
    city: string;
  },
  user_categories: {
    restaurants?: boolean; 
    trade_fairs?: boolean;
    lectures?: boolean;   
    cafe?: boolean;       
    bars?: boolean;       
    sport?: boolean;      
    dancing?: boolean;    
    games?: boolean;      
    quests?: boolean;     
    concerts?: boolean;   
    parties?: boolean;    
    show?: boolean;       
    for_free?: boolean;   
    cinema?: boolean;     
    theaters?: boolean;   
  }, 
  user_mood: {
    funny?: boolean;       
    sad?: boolean;         
    gambling?: boolean;    
    romantic?: boolean;    
    energetic?: boolean;   
    festive?: boolean;     
    calm?: boolean;        
    friendly?: boolean;    
    cognitive?: boolean;   
    dreamy?: boolean;      
    do_not_know?: boolean; 
  }
}

@Controller()
export class SignupController {
  constructor(private readonly signupService: SignupService) {};

  @Post('/signup')
  createUser(@Body() userDto) {
    try {
      const user = userDto.user
      return this.signupService.createUser(user);
    } catch(e) {
     return console.log(e);
    }
  }

  @Post('/signup_remember_me')
  createUserWithRememberMe(@Body() userDto) {
    try {
      const user = userDto.user
      return this.signupService.createUserWithRememberMe(user);
    } catch(e) {
     return console.log(e);
    }
  }

}