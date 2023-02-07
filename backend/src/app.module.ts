/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule} from './user/user.module'
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'boom25442544',
      database : 'vehicle4you',
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
      synchronize: true,
        };
      },
      
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
