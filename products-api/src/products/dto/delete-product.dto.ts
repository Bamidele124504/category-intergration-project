import { IsNumber } from 'class-validator';

export class DeleteProductDto {

  @IsNumber()
  id: number;

}