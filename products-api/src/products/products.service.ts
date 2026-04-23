import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity'; // ✅ ADD THIS
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category) 
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number) {

    const { categoryId, ...productData } = createProductDto;

    // 
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // 
    const product = this.productRepository.create({
      ...productData,
      category,
      owner: { id: userId },
    });

    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find({
      relations: ['owner', 'category'], 
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner', 'category'], 
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {

    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }
}