import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new BadRequestException('Invalid credentials');
    const { password: _, ...result } = user;
    const access_token = this.jwtService.sign({ sub: user.id, role: user.role });
    return { user: result, access_token };
  }

  async adminLogin(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.role !== 'admin') throw new BadRequestException('Not an admin');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new BadRequestException('Invalid credentials');
    const { password: _, ...result } = user;
    const access_token = this.jwtService.sign({ sub: user.id, role: user.role });
    return { user: result, access_token };
  }
}