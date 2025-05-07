import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env ko load karega
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        "entities": ["dist/**/*.entity{.ts,.js}"],
        synchronize: true, // dev ke liye true, prod me false
      }),
    }),
    UserModule,
    AuthModule,
    ClaimModule,
  ],
})
export class AppModule {}