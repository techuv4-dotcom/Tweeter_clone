import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { importOrRequireFile } from 'typeorm/util/ImportUtils.js';
import { User } from './entities/user.entity';
import { EmailService } from 'src/utils/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
