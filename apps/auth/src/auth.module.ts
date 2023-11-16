import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt"
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [UsersModule, LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        PORT: Joi.number().required()
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN')+"s" }
      }),
      inject: [ConfigService]
    })
    
   ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
