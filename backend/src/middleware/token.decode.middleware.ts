import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';



@Injectable()
export class TokenMiddleware implements NestMiddleware {


    constructor(private jwtService: JwtService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers['authorization'].replace('Bearer', '').trim();
        //console.log(token);
  
        //Make sure token exists
        let id;
        
        if (token) {
            jwtService: JwtService;
            const decoded = await this.jwtService.decode(token);
            //console.log(decoded);
            id = decoded['id'];
        }
        //req.body['id'] = id;
    }
  catch (err) {
      console.log(err)
  }
    next();
  }
}
