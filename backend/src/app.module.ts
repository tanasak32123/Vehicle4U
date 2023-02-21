import { UserController } from './user/user.controller';
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import  config  from './config/config';
import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './middleware/token.decode.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      load : [config]
    }) ,
    TypeOrmModule.forRootAsync({
      
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        host : configService.get<string>('database.host'),
        synchronize: true,
        autoLoadEntities: true,
     }),
     inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(UserController);
  }
}
