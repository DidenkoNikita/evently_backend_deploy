import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchService } from './service/search';
import { TokenValidationService } from './service/validate-token';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private validateToken: TokenValidationService) {}

  @Get('/')
  getHello() {
    // return this.appService.getHello();
    return this.appService.setPosts();
  }

  @Post('/') 
  checkNumber(@Body() number) {    
    return this.appService.checkNumber(number.number)
  }

  @Post('/check_remember_me')
  async checkRememberMe(@Body() id, @Req() req: Request, @Res() res: Response) {
    const authorizationHeader = req.headers.authorization;   
    
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];      
      
      const validate = this.validateToken.validateRefreshToken(token);      
      
      if (validate) {        
        const user = await this.appService.signin(id);
        
        res.status(200).json(user);
      } else {
        res.status(401)
      }
    } else {
      res.status(401).send('Missing Authorization header');
    }
  }
}
