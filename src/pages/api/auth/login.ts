import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from "bcryptjs";
import mongoPromise from '@curso-contentful-next/lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Method not allowed' });
            return;
        }

        if (req.body === null || req.body === undefined) {
            res.status(400).send({ message: 'Missing credentials' });
            return;
        }

        const client = await mongoPromise;
        const db = client.db("cf-auth-users");
        const { email, password } = req.body;

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            res.status(401).send({ message: 'Invalid email' });
            return;
        }

        return bcrypt.compare(password, user.password, function(error, isMatch) {
            if (error) {
                return res.status(500).send({ message: 'Error comparing passwords' });
            } else if (!isMatch) {
                return res.status(401).send({ message: 'Invalid password' });
            } else {
                return res.status(200).send({ message: 'Success', user, authenticated: true });
            }
        });
    } catch (error: unknown) {
        return res.status(500).send({ message: (error as Error).message });
    }
};

export const config = {
    api: {
      externalResolver: true,
    },
}  

export default handler;