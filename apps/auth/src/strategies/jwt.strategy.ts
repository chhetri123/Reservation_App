
import { Injectable, Logger } from "@nestjs/common";
import {  ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { Request } from "express";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request)=>request?.cookies?.Authentication]),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: TokenPayload) {
        const user = await this.userService.getUser({_id: payload.userId});
                return user;
      
    }

}
