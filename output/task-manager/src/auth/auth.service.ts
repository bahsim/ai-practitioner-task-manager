import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity/user.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto): Promise<User> {
    // Check username uniqueness
    const existingUserByUsername = await this.userRepository.findOne({
      where: { username: signupDto.username },
    });
    if (existingUserByUsername) {
      throw new BadRequestException('Username already exists');
    }

    // Check email uniqueness
    const existingUserByEmail = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });
    if (existingUserByEmail) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(signupDto.password);

    // Create user
    const user = this.userRepository.create({
      username: signupDto.username,
      email: signupDto.email,
      password: hashedPassword,
      about: signupDto.about || null,
      avatar: signupDto.avatar || null,
    });

    return await this.userRepository.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
