import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Tweet } from './entities/tweet.entity';
import { User } from 'src/users/entities/user.entity';
import { FileHandle } from 'src/file-handle/entities/file_handle.entity';
import cloudinary from 'src/cloudinary/cloudinary.config';

export interface TweetResponse {
  statusCode: number;
  message: string;
  tweetData: object | null;
}

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepo: Repository<Tweet>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(FileHandle)
    private fileHandleRepo: Repository<FileHandle>,
  ) {}

  async create(
    createTweetDto: CreateTweetDto,
    user: { id: number },
  ): Promise<TweetResponse> {
    try {
      const savedTweet = await this.tweetRepo.save({
        user: {
          id: user.id,
        },
        tweet: createTweetDto.tweet,
        urls: createTweetDto.urls,
      });

      await this.fileHandleRepo.update(
        {
          public_id: In(createTweetDto.public_id),
        },
        {
          isUsed: true,
        },
      );

      const unUsedFiles = await this.fileHandleRepo.find({
        where: {
          isUsed: false,
        },
      });

      unUsedFiles.map((file) => {
        cloudinary.uploader.destroy(file.public_id);
      });

      await this.fileHandleRepo.delete({
        isUsed: false,
      });

      const tweetRsp = await this.tweetRepo.findOne({
        where: {
          id: savedTweet.id,
        },
        relations: {
          user: true,
        },
      });
      // delete tweetRsp?.user.password
      return {
        statusCode: 200,
        message: 'post successfully',
        tweetData: tweetRsp,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create tweet');
    }
  }

  async findAll(page: number, limit: number) {
    try {
      const tweetsObj = await this.tweetRepo.find({
        relations: {
          user: true,
        },
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      // // console.log(tweetsObj);
      // console.log(
      //   'PAGE:',
      //   page,
      //   tweetsObj.map((t) => t.id),
      // );
      return tweetsObj;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async findOne(id: number) {
    const response = await this.userRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        tweets: true,
      },
    });

    return response;
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  async remove(id: number) {
    try {
      // await cloudinary.uploader.destroy()
      const responce = await this.tweetRepo.delete(id);
      return { message: `This action removes a #${id} tweet`, data: responce };
    } catch (error) {
      console.log(error);
    }
  }
}
