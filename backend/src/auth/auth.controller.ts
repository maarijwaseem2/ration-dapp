import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto.email, dto.password);
  }
  @Post('admin-login')
async adminLogin(@Body() dto: LoginAuthDto) {
  return this.authService.adminLogin(dto.email, dto.password);
}
}