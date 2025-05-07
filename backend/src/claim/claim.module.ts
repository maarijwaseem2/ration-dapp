import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './entities/claim.entity';
import { User } from '../user/entities/user.entity'; // sahi path check karo
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Claim, User]), // <-- YEH LINE ZAROORI HAI
  ],
  controllers: [ClaimController],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}