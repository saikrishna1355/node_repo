import { Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis({
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null as any,
});

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    const { to, subject, body } = job.data as {
      to: string;
      subject: string;
      body: string;
    };

    // Do your email sending logic here
    console.log(`📧 Sending email to: ${to}, subject: ${subject}`);
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});

export default emailWorker;
