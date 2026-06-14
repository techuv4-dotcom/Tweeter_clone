import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileHandleService } from './file-handle.service';
import { UpdateFileHandleDto } from './dto/update-file-handle.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { request } from 'express';

@Controller('file-handle')
export class FileHandleController {
  constructor(private readonly fileHandleService: FileHandleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('image', 10, { dest: './public' }))
  async uplouadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    return this.fileHandleService.uploadFile(files, req.user);
  }

  @Get()
  findAll() {
    return this.fileHandleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileHandleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileHandleDto: UpdateFileHandleDto,
  ) {
    return this.fileHandleService.update(+id, updateFileHandleDto);
  }

  @Delete(':public_id')
  remove(@Param('public_id') id: string) {
    return this.fileHandleService.remove(id);
  }
}
