import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from 'src/service/generate-token';
import { SearchService } from 'src/service/search';
import { TokenValidationService } from 'src/service/validate-token';

@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  constructor(private searchService: SearchService, private validateToken: TokenValidationService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;
    console.log('authorizationHeader::',authorizationHeader);
    
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      console.log('token::',token);
      
      const validate = this.validateToken.validateAccessToken(token);
      console.log('validate',validate);
      
      if (validate) {        
        next();
      } else {
        const { user_id } = req.body;
        const token = await this.searchService.findTokenByUserId(user_id);
        console.log('refresh token::', token);
        console.log(token.refresh_token);
        
        
        const validateRefresh = this.validateToken.validateRefreshToken(token.refresh_token);
        console.log('validate refresh::', validateRefresh);
        
        if (validateRefresh === null) {
          res.status(401).send('Invalid token');
        } else {
          const idUser = req.body.user_id;
          const { name } = await this.searchService.findUserById(idUser);
          const accessToken = generateAccessToken({ username: name });
          res.status(201).json(accessToken);
        }
      }
    } else {
      res.status(401).send('Missing Authorization header');
    }
  }
}
