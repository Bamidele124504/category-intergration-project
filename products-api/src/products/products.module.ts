import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product,Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    /*
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PATCH },
        { path: 'products/:id', method: RequestMethod.DELETE },
      );
*/
  }

}