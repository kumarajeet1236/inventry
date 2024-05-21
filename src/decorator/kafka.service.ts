import { Injectable } from '@nestjs/common';
import { KAFKA_TOPIC_METADATA } from './kafka.decorator';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class KafkaDecoratorProcessorService {
  constructor(
    private readonly appConfig: ConfigService,
  ) {
  }

  processKafkaDecorators(types: any[]) {
    for (const type of types) {
      const propNames = Object.getOwnPropertyNames(type.prototype);
      for (const prop of propNames) {
        const propValue = Reflect.getMetadata(
          KAFKA_TOPIC_METADATA,
          Reflect.get(type.prototype, prop),
        );

        if (propValue) {
          const topic = propValue+'-'+this.appConfig.get('NEST_ENV');
          console.log(topic)
          Reflect.decorate(
            [MessagePattern(topic)],
            type.prototype,
            prop,
            Reflect.getOwnPropertyDescriptor(type.prototype, prop),
          );
        }
      }
    }
  }
}