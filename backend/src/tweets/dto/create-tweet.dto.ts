import {
  IsNotEmpty,
  isString,
  IsString,
  maxLength,
  MaxLength,
} from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  declare tweet: string;

  @MaxLength(10000, { each: true })
  declare urls: string[];

  @MaxLength(10000, { each: true })
  declare public_id: string[];
}
