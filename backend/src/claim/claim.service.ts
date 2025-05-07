import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { Claim } from './entities/claim.entity';
import { CreateClaimDto } from './dto/create-claim.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createClaimDto: CreateClaimDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
  
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    // Check for existing claim by NIC or walletAddress for this month
    const existingClaim = await this.claimRepository.findOne({
      where: [
        {
          nic: createClaimDto.nic,
          createdAt: MoreThanOrEqual(startOfMonth),
        },
        {
          walletAddress: createClaimDto.walletAddress,
          createdAt: MoreThanOrEqual(startOfMonth),
        }
      ],
    });
  
    if (existingClaim) {
      throw new Error('This NIC or wallet address has already claimed this month');
    }
  
    const claim = this.claimRepository.create({ ...createClaimDto, user });
    return this.claimRepository.save(claim);
  }

  async findAll() {
    return this.claimRepository.find({ relations: ['user'] });
  }

  async approve(id: number) {
    return this.claimRepository.update(id, { status: 'approved' });
  }

  async reject(id: number) {
    return this.claimRepository.update(id, { status: 'rejected' });
  }
}