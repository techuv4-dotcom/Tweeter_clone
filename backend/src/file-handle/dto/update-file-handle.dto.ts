import { PartialType } from '@nestjs/mapped-types';
import { CreateFileHandleDto } from './create-file-handle.dto';

export class UpdateFileHandleDto extends PartialType(CreateFileHandleDto) {}
