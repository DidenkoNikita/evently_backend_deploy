import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationService {
  validateAccessToken(accessToken: string): any {
    try {
      const validateAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      console.log('validateAccessToken::', validateAccessToken);
      return validateAccessToken;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): any {
    try {
      const validateRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      console.log('validateRefreshToken::', validateRefreshToken);
      return validateRefreshToken;
    } catch (e) {
      return null;
    }
  }
}