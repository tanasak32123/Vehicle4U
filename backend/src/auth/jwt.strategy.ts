/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// const cookieExtractor = function (req) {
//     let token = null;
//     if (req && req.cookies) {
//       token = req.cookies["access_token"];
//     }
//     console.log(token);
//     if (token) {
//       return token.access_token;
//     }
//     return null;
//   };
  type TokenPayload = {
    id: number;
    name: string;
  };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "MYSECRET",
    });
  }

  async validate(payload: TokenPayload) {
    return {
      id: payload.id,
      name: payload.name,
    };
  }

}