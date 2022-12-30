import cron from 'node-cron';
import { postTweet } from './lib/twitter';
import { getNextTweet, markAsTweeted } from './lib/firestore';
import express from 'express';
import { makeKeyFile } from './lib/util';
import healthCheckRouter from './routes/health';

const app = express();
app.use(express.json());
app.use(healthCheckRouter);

makeKeyFile();

cron.schedule('0 8,16,0 * * *', async () => {
  try {
    const { tweet, doc } = await getNextTweet();
    await postTweet(tweet);
    await markAsTweeted(doc);
  } catch (error) {
    console.log('🥵 Crash', error);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("😤 Let's go");
});
