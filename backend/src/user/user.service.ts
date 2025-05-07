import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new BadRequestException('Email already registered');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({ ...dto, password: hashed });
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return { message: "User registered successfully", user: result };
  }
}