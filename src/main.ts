import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { InventryController } from './modules/inventry/inventry.controller';
import { KafkaDecoratorProcessorService } from './decorator/kafka.service';

// Create micro service options
const microserviceOptions = {
  // name: 'YAHOO_JOB_SERVICE',
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER_1],
    },
    consumer: {
      groupId: `NOTIFICATION_MICROSERVICE_${process.env.NEST_ENV}`,
      allowAutoTopicCreation: true,
    },
  },
};

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app
    .get(KafkaDecoratorProcessorService)
    .processKafkaDecorators([InventryController]);

  //to replace nest logger with winston logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.listen();
}
bootstrap();
