import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findAll() {
    return this.userRepository.find();
  }
  
  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
  
  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    return this.userRepository.remove(user);
  }

}