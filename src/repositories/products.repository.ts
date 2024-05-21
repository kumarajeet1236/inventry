import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/products.entity';
import { IInventry } from 'src/modules/inventry/interface/inventry.interface';

@Injectable()
export class ProductsRepository extends Repository<Product> {
  constructor(readonly dataSource: DataSource) {
    super(Product, dataSource.manager);
  }

  updateProductQuantity(payload: IInventry) {
    return this.createQueryBuilder('product')
      .update(Product)
      .set({ quantity: () => `quantity - 1` })
      .where('product.id in (...=:productId) and userId =:userId', {
        productId: payload.productId,
        userId: payload.userId,
      })
      .execute();
  }
}
