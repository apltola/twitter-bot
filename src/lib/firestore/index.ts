import {
  Firestore,
  DocumentData,
  QueryDocumentSnapshot,
} from '@google-cloud/firestore';

const db = new Firestore();

export const getNextTweet = async () => {
  const snapshot = await db
    .collection(process.env.DB_COLLECTION as string)
    .orderBy('tweetedAt', 'asc')
    .get();

  const doc = snapshot.docs[0];
  const tweet = doc.data().text.replace(/\\n/g, '\n') as string;
  console.log('🗄 Got next tweet from db', doc.data());
  return { tweet, doc };
};

export const markAsTweeted = async (
  doc: QueryDocumentSnapshot<DocumentData>
) => {
  await db
    .collection(process.env.DB_COLLECTION as string)
    .doc(doc.id)
    .set({ tweetedAt: Date.now() }, { merge: true });

  console.log('📝 Updated doc with id', doc.id);

  return { updated: true };
};
