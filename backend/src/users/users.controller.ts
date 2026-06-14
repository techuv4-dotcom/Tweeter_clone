import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { DefaultReturnResponse } from './users.service';
import { LoginUsreDto } from './dto/login.user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<DefaultReturnResponse> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginuserdto: LoginUsreDto,
  ): Promise<DefaultReturnResponse> {
    return await this.usersService.login(loginuserdto);
  }

  @Post('verify_Otp')
  checkOtp(@Body('user_id') user_id: number, @Body('otp') otp: string) {
    return this.usersService.checkOtp(user_id, otp);
  }

  @Get('Home')
  @UseGuards(JwtAuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
