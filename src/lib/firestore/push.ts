import { Firestore } from '@google-cloud/firestore';

const db = new Firestore();

const dataToUpload = [
  {
    text: '',
    tweetedAt: null,
  },
];

async function push() {
  const promises = dataToUpload.map((d) => {
    if (!d.text) return null;
    return db
      .collection(process.env.DB_COLLECTION as string)
      .add(d)
      .then(() => console.log('Added', d));
  });

  await Promise.all(promises);
  console.log('All done');
}

push();
