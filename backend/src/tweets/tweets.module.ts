import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';
import { FileHandle } from 'src/file-handle/entities/file_handle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet, User, FileHandle])],
  controllers: [TweetsController],
  providers: [TweetsService],
})
export class TweetsModule {}
