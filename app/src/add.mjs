import { Queue } from 'bullmq';
import { Redis } from "ioredis";

const connection = new Redis(6379,"redis",{ maxRetriesPerRequest: null });

const queue = new Queue('foo',{connection});

setInterval(()=>{
  queue.add('cars', { color: 'blue' });
},1000);
