export const KAFKA_TOPIC_METADATA = '__kafka-topic-candidate';
export function KafkaTopic(variable: string): any {
  return (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    Reflect.defineMetadata(
      KAFKA_TOPIC_METADATA,
      variable,
      descriptor.value,
    );
    return descriptor;
  };
}
