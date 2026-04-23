import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService implements OnModuleInit {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Seed default categories (VERY USEFUL)
  async onModuleInit() {
    const count = await this.categoryRepository.count();

    if (count === 0) {
      await this.categoryRepository.save([
        {
          name: 'Electronics',
          description: 'Electronic devices'
        },
        {
          name: 'Books',
          description: 'All kinds of books'
        },
        {
          name: 'Clothing',
          description: 'Wearable items'
        }
      ]);

      console.log('Default categories seeded');
    }
  }
}