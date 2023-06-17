import type { NextApiRequest, NextApiResponse } from 'next';
import clientMongoPromise from '@curso-contentful-next/lib/mongodb';

type DataResponse = {

};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponse>
  ) {
    const client = await clientMongoPromise;
    const db = client.db('cf-auth-users');

    const user = await db.collection('users').findOne({ email: 'juan.ortiz@codigofacilito.com' });

    console.log(user);

    res.status(200).json({ user });
  }
  