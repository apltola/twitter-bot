import fs from 'fs';
import cron from 'node-cron';
import { postTweet } from './lib/twitter';
import { getNextTweet, markAsTweeted } from './lib/firestore';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

// this is kinda hacky but whatever
if (process.env.NODE_ENV === 'production') {
  console.log('Make key_file.json!!!');
  const decodedKeyFile = Buffer.from(
    process.env.KEY_FILE as string,
    'base64'
  ).toString();
  fs.writeFileSync('key_file.json', decodedKeyFile);
}

cron.schedule('* * * * *', async () => {
  try {
    const { tweet, doc } = await getNextTweet();
    // await postTweet(tweet);
    // await markAsTweeted(doc);
  } catch (error) {
    console.log('🥵 crash', error);
  }
});

// This exists because of Digital Ocean wants a health check endpoint, if not healthy, it pulls down the container
app.get('/', (req: Request, res: Response) => {
  console.log('🛎 Root pinged');
  res.status(200).json({ healthy: true });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("😤 let's go");
});
