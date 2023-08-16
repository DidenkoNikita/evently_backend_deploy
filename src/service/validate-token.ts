import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationService {
  validateAccessToken(accessToken: string): string | jwt.JwtPayload {
    try {
      const validateAccessToken: string | jwt.JwtPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return validateAccessToken;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string): string | jwt.JwtPayload {
    try {
      const validateRefreshToken: string | jwt.JwtPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      return validateRefreshToken;
    } catch (e) {
      return null;
    }
  }
}