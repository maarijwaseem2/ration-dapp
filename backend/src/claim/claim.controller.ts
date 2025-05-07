import { Controller, Post, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateClaimDto, @Request() req) {
    return this.claimService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.claimService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/approve')
  approve(@Param('id') id: number) {
    return this.claimService.approve(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reject')
  reject(@Param('id') id: number) {
    return this.claimService.reject(id);
  }
}