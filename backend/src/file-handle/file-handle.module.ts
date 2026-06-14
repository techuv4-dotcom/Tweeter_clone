import { Module } from '@nestjs/common';
import { FileHandleService } from './file-handle.service';
import { FileHandleController } from './file-handle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileHandle } from './entities/file_handle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileHandle])],
  controllers: [FileHandleController],
  providers: [FileHandleService],
})
export class FileHandleModule {}
