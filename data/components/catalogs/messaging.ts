import { SystemComponent } from '../types';

export const MESSAGING_COMPONENTS: SystemComponent[] = [
  {
    id: 'queue-generic',
    name: 'Generic Queue',
    category: 'Communication',
    description: 'Message Broker',
    iconName: 'MessageSquare',
    iconType: 'lucide',
    visualType: 'queue',
    role: 'communication',
    tags: ['queue', 'message']
  },
  {
    id: 'queue-kafka',
    name: 'Kafka',
    category: 'Communication',
    description: 'Event Streaming Platform',
    iconName: 'SiApachekafka',
    iconType: 'si',
    visualType: 'queue',
    role: 'communication',
    technology: 'Kafka',
    tags: ['event', 'stream', 'pubsub']
  },
  {
    id: 'queue-rabbitmq',
    name: 'RabbitMQ',
    category: 'Communication',
    description: 'Message Broker',
    iconName: 'SiRabbitmq',
    iconType: 'si',
    visualType: 'queue',
    role: 'communication',
    technology: 'RabbitMQ',
    tags: ['queue', 'amqp']
  },
  {
    id: 'queue-sqs',
    name: 'Amazon SQS',
    category: 'Communication',
    description: 'Managed Message Queue',
    iconName: 'SiAmazonsqs',
    iconType: 'si',
    visualType: 'queue',
    role: 'communication',
    technology: 'SQS',
    provider: 'AWS',
    tags: ['aws', 'queue']
  }
];
