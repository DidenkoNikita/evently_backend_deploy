import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { JwtPayload } from 'jsonwebtoken';
import { AppService } from './app.service';
import { CheckNuber, Id } from './interface';
import { TokenValidationService } from './service/validate-token';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private validateToken: TokenValidationService) { }

  @Post('/')
  async checkNumber(@Body() number: CheckNuber) {
    try {
      return await this.appService.checkNumber(number.number);
    } catch (e) {
      return console.log(e);
    }
  }

  @Post('/check_remember_me')
  async checkRememberMe(@Body() id: Id, @Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers.authorization;

      if (authorizationHeader) {
        const token: string = authorizationHeader.split(' ')[1];

        const validate: string | JwtPayload = this.validateToken.validateRefreshToken(token);

        if (validate) {
          const user = await this.appService.signin(id);

          res.status(200).json(user);
        } else {
          res.status(401)
        }
      } else {
        res.status(401).send('Missing Authorization header');
      }
    } catch (e) {
      return console.log(e);
    }
  }
  // Dima, this is a crutch to clear users from the database without pain))
  @Delete('/')
  async delete() {
    try {
      await this.appService.delete();
    } catch (e) {
      return console.log(e);
    }
  }
}
