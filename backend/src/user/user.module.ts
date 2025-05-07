import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // <-- YEH LINE ZAROORI HAI
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // agar dusre modules me bhi chahiye
})
export class UserModule {}