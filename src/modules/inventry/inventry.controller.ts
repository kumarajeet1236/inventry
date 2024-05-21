import { Controller, Inject, Logger } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { KafkaTopic } from '../../decorator/kafka.decorator';
import { InventryService } from './inventry.service';
import { IInventry } from './interface/inventry.interface';

@Controller()
export class InventryController {
  constructor(
    private inventryService: InventryService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {}

  @KafkaTopic(`updateInventry`)
  async sendNotification(@Payload() req) {
    try {
      let data: IInventry = req.value.data;

      await this.inventryService.updateProductQuantity(data);

      return {
        status: 'success',
        messagae: 'acknowledged',
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: 'failure',
        error: 'Something went wrong!',
        message: 'Internal server error!',
      };
    }
  }
}
