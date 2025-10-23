import emailQueue from '../queues/emailQueue';

export interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

const addEmailJob = async ({ to, subject, body }: EmailJob) => {
  await emailQueue.add('emailQueue', { to, subject, body });
};

export default addEmailJob;

