import { Worker } from 'bullmq';
import { Redis } from "ioredis";

const connection = new Redis(6379,"redis",{ maxRetriesPerRequest: null });
const worker = new Worker('foo', async job => {
  // throw new Error("some error");
  console.log(job.data);
},{connection});
