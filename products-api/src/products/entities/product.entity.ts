import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  //  Existing relationship
  @ManyToOne(() => User, (user) => user.products)
  owner: User;

  // NEW: Category relationship
  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}