import fs from 'fs';
import cron from 'node-cron';
import { postTweet } from './lib/twitter';
import { getNextTweet, markAsTweeted } from './lib/firestore';

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

console.log("😤 let's go");
