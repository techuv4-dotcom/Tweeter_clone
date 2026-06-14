import { Injectable } from '@nestjs/common';
import cloudinary from '../cloudinary/cloudinary.config';
import { UpdateFileHandleDto } from './dto/update-file-handle.dto';
import * as fs from 'fs/promises';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileHandle } from './entities/file_handle.entity';

export interface UploadFileProps {
  statusCode: number;
  message: string;
  data?: CloudinaryResponse[];
}

interface CloudinaryResponse {
  url: string;
  public_id: string;
}

@Injectable()
export class FileHandleService {
  constructor(
    @InjectRepository(FileHandle)
    private tempFileRepo: Repository<FileHandle>,
  ) {}
  async uploadFile(
    files: Express.Multer.File[],
    user: any,
  ): Promise<UploadFileProps> {
    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          const response = await cloudinary.uploader.upload(file.path);
          await fs.unlink(file.path);

          await this.tempFileRepo.save({
            userId: user.id,
            filePath: response.url,
            fileType: response.resource_type,
            public_id: response.public_id,
          });
          return {
            url: response.url,
            public_id: response.public_id,
          };
        }),
      );

      return {
        statusCode: 201,
        message: 'files uploaded successfully',
        data: uploads,
      };
    } catch (error) {
      console.error(error);

      return {
        statusCode: 500,
        message: 'Somthing went wrong',
      };
    }
  }
  findAll() {
    return `This action returns all fileHandle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileHandle`;
  }

  update(id: number, updateFileHandleDto: UpdateFileHandleDto) {
    return `This action updates a #${id} fileHandle`;
  }

  async remove(id: string) {
    const responce = await cloudinary.uploader.destroy(id);
    await this.tempFileRepo.delete({
      public_id: id,
    });
    return responce;
  }
}
