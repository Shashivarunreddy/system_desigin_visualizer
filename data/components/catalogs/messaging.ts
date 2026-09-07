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
    tags: ['event', 'stream', 'pubsub'],
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg'
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
    tags: ['queue', 'amqp'],
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg'
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
