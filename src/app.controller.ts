import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    return this.appService.setPosts();
  }

  @Post() 
  checkNumber(@Body() number) {
    console.log(number);
    
    return this.appService.checkNumber(number.number)
  }
}
