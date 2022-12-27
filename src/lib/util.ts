import fs from 'fs';

/**
 * This is kinda hacky but whatever.
 * In production, get base64-encoded GCP service account key fron environment variable,
 * and create a key_file.json which gives the app access to Firestore
 */
export const makeKeyFile = () => {
  if (process.env.NODE_ENV !== 'production') return;

  console.log('🔐 Make key_file.json');
  const decodedKeyFile = Buffer.from(
    process.env.KEY_FILE as string,
    'base64'
  ).toString();

  fs.writeFileSync('key_file.json', decodedKeyFile);
};
