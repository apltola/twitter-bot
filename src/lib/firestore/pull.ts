import { Firestore } from '@google-cloud/firestore';

const db = new Firestore();

async function pull() {
  const snapshot = await db
    .collection(process.env.DB_COLLECTION as string)
    .orderBy('tweetedAt', 'asc')
    .get();

  snapshot.docs.forEach((d) => {
    console.log(d.data());
  });
}

pull();
