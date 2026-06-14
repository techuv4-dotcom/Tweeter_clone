import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUsreDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
import { EmailService } from 'src/utils/email.service';
import { log } from 'node:console';

interface UserResponseProps {
  id: number;
  name: string;
  email: string;
  is_verification: number;
}
export interface DefaultReturnResponse {
  statusCode: number;
  message: string;
  accessToken?: string;
  data: UserResponseProps | null;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async checkMail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async create(createUserDto: CreateUserDto): Promise<DefaultReturnResponse> {
    try {
      const check = await this.checkMail(createUserDto.email);
      if (check && check.is_verification === 1) {
        return {
          statusCode: 400,
          message: 'This user already exists',
          data: null,
        };
      } else if (check && check.is_verification === 0) {
        check.id;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.emailService.sendOtp(createUserDto.email, otp);
        await this.userRepository.update(
          { email: createUserDto.email },
          {
            otp: otp,
          },
        );
        return {
          statusCode: 401,
          message: 'This user is not verifyde',
          data: null,
        };
      }
      
      const hashPassword = await argon2.hash(createUserDto.password);
      const user = await this.userRepository.save({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashPassword,
        is_verification: 0,
      });
      
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      if (user) {
        await this.emailService.sendOtp(user.email, otp);
        await this.userRepository.update(user.id, {
          otp: otp,
        });
      }
      
      return {
        statusCode: 201,
        message: 'user created',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          is_verification: user.is_verification,
        },
      };
    } catch (error) {
      console.log(error);

      return {
        statusCode: 501,
        message: 'somethng went wrong please try agine',
        data: null,
      };
    }
  }

  async findUserWithEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async passwordCheck(
    UserPassword: string,
    DtoPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(UserPassword, DtoPassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async login(loginuserdto: LoginUsreDto): Promise<DefaultReturnResponse> {
    try {
      const ur = await this.findUserWithEmail(loginuserdto.email);
      if (!ur) {
        return {
          statusCode: 404,
          message: 'Invalid credentials!',
          data: null,
        };
      }

      if (ur.is_verification === 0) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.emailService.sendOtp(ur.email, otp);
        await this.userRepository.update(ur.id, {
          otp: otp,
        });
      }
      const result = await this.passwordCheck(
        ur.password,
        loginuserdto.password,
      );
      if (!result) {
        return {
          statusCode: 401,
          message: 'Invalid credentials!',
          data: null,
        };
      }

      // jwt token
      const paylod = {
        sub: ur.id,
        name: ur.name,
        email: ur.email,
      };

      const access_token = await this.jwtService.signAsync(paylod);

      return {
        statusCode: 200,
        message: 'Login successful',
        accessToken: access_token,
        data: {
          id: ur.id,
          name: ur.name,
          email: ur.email,
          is_verification: ur.is_verification,
        },
      };
    } catch (error) {
      return {
        statusCode: 404,
        message: 'Somthing went wrong',
        data: null,
      };
    }
  }

  async checkOtp(user_id: number, otp: string) {
    const user = await this.userRepository.findOneBy({
      id: user_id,
    });

    if (user?.otp === otp) {
      await this.userRepository.update(
        {
          id: user_id,
        },
        {
          is_verification: 1,
        },
      );
      return true;
    }
    return false;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const isUpdated = await this.userRepository.update(id, updateUserDto);
    // return this.userRepository.findOneBy({ id });
    return isUpdated.affected ? true : false;
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
