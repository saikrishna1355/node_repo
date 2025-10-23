import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
});

const emailQueue = new Queue('emailQueue', { connection });

export default emailQueue;

