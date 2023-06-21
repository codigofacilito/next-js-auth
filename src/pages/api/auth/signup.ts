import type { NextApiRequest, NextApiResponse } from 'next';
import clientMongoPromise from '@curso-contentful-next/lib/mongodb';
import bcrypt from 'bcryptjs';

type Data = {

}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) => {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'We only accept POST' });
        return;
    }

    if (typeof req.body !== 'object' || req.body === null || req.body === undefined) {
        res.status(400).json({ message: 'Please send a body in your request' });
        return;
    }

    try {
        const { password, email } = req.body;

        const client = await clientMongoPromise;
        const db = client.db('cf-auth-users');
    
        const user = await db.collection('users').findOne({ email });

        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        bcrypt.genSalt(10, (error, salt) => {
            if (error) {
                res.status(500).json({ message: "Something went wrong" });
                return;
            }

            bcrypt.hash(password, salt, async (errorHashing, passwordHashed) => {
                if (errorHashing) {
                    res.status(500).json({ message: "Something went wrong" });
                    return;
                }

                const userCreated = await db.collection('users').insertOne({
                    ...req.body,
                    email,
                    password: passwordHashed,
                });

                res.status(200).json({ mesage: "User created", userCreated });
            });
        });    
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
  }
  
export const config = {
    api: {
        externalResolver: true,
    },
};

export default handler;