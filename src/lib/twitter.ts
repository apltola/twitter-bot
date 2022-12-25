import crypto from 'crypto';
import OAuth, { Consumer, Token } from 'oauth-1.0a';
import axios from 'axios';

const endpointURL = `https://api.twitter.com/2/tweets`;

const consumer: Consumer = {
  key: process.env.CONSUMER_KEY as string,
  secret: process.env.CONSUMER_SECRET as string,
};

const token: Token = {
  key: process.env.ACCESS_TOKEN as string,
  secret: process.env.ACCESS_TOKEN_SECRET as string,
};

const oauth = new OAuth({
  consumer,
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString: string, key: string) =>
    crypto.createHmac('sha1', key).update(baseString).digest('base64'),
});

export const postTweet = async (text: string) => {
  try {
    const authHeader = oauth.toHeader(
      oauth.authorize(
        {
          url: endpointURL,
          method: 'POST',
        },
        token
      )
    );

    const res = await axios.post(
      endpointURL,
      { text },
      {
        responseType: 'json',
        headers: {
          Authorization: authHeader['Authorization'],
          'user-agent': 'v2CreateTweetJS',
          'content-type': 'application/json',
          accept: 'application/json',
        },
      }
    );

    console.log('✅ Posted tweet', res.data);
    return res.data;
  } catch (error) {
    console.log('👹 Error', error);
    throw error;
  }
};
