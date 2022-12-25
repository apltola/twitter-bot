import cron from 'node-cron';
import { postTweet } from './lib/twitter';
import { getNextTweet, markAsTweeted } from './lib/firestore';

cron.schedule('* * * * *', async () => {
  const { tweet, doc } = await getNextTweet();
  await postTweet(tweet);
  await markAsTweeted(doc);
});
