import { QueueEvents } from 'bullmq';
import { Redis } from "ioredis";

const connection = new Redis(6379,"redis",{ maxRetriesPerRequest: null });

const queueEvents = new QueueEvents('foo',{connection});

queueEvents.on('completed', ({ jobId }) => {
  console.log('done painting');
});

queueEvents.on(
  'failed',
  ({ jobId, failedReason }) => {
    console.error('error painting', failedReason);
  },
);
