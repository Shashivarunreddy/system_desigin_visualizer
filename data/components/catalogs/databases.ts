import { SystemComponent } from '../types';

export const DATABASE_COMPONENTS: SystemComponent[] = [
  {
    id: 'database-generic',
    name: 'Generic Database',
    category: 'Data',
    description: 'Generic Data Storage',
    iconName: 'Database',
    iconType: 'lucide',
    visualType: 'database',
    role: 'database',
    tags: ['db', 'data', 'store']
  },
  {
    id: 'database-postgresql',
    name: 'PostgreSQL',
    category: 'Data',
    description: 'Relational Database',
    iconName: 'SiPostgresql',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'PostgreSQL',
    tags: ['sql', 'relational']
  },
  {
    id: 'database-mysql',
    name: 'MySQL',
    category: 'Data',
    description: 'Relational Database',
    iconName: 'SiMysql',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'MySQL',
    tags: ['sql', 'relational']
  },
  {
    id: 'database-mongodb',
    name: 'MongoDB',
    category: 'Data',
    description: 'NoSQL Document Store',
    iconName: 'SiMongodb',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'MongoDB',
    tags: ['nosql', 'document']
  },
  {
    id: 'database-redis',
    name: 'Redis',
    category: 'Data',
    description: 'In-Memory Data Store',
    iconName: 'SiRedis',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'Redis',
    tags: ['cache', 'nosql', 'in-memory']
  },
  {
    id: 'database-dynamodb',
    name: 'DynamoDB',
    category: 'Data',
    description: 'AWS NoSQL Database',
    iconName: 'SiAmazondynamodb',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'DynamoDB',
    provider: 'AWS',
    tags: ['aws', 'nosql', 'key-value']
  },
  {
    id: 'database-cassandra',
    name: 'Cassandra',
    category: 'Data',
    description: 'Wide Column Store',
    iconName: 'SiApachecassandra',
    iconType: 'si',
    visualType: 'database',
    role: 'database',
    technology: 'Cassandra',
    tags: ['nosql', 'column']
  }
];
