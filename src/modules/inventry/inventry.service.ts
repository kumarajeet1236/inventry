import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repositories/products.repository';
import { IInventry } from './interface/inventry.interface';

@Injectable()
export class InventryService {
  constructor(private productsRepository: ProductsRepository) {}

  updateProductQuantity(payload: IInventry) {
    return this.productsRepository.updateProductQuantity(payload);
  }
}
