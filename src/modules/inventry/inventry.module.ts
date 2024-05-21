import { Module } from '@nestjs/common';
import { InventryController } from './inventry.controller';
import { InventryService } from './inventry.service';
import { KafkaDecoratorProcessorService } from '../../decorator/kafka.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/repositories/products.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [InventryController],
  providers: [InventryService, KafkaDecoratorProcessorService],
  exports: [],
})
export class InventryModule {}
