import { Injectable, BadRequestException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {

    const { email, password } = signupDto;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      ...signupDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(loginDto: LoginDto) {

    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}