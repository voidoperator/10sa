import admin from '@/firebase/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.body;

  try {
    const userDocRef = admin.firestore().collection('users').doc(uid);
    const userDocSnap = await userDocRef.get();
    if (!userDocSnap.exists) {
      res.status(400).json({ errorMessage: 'auth/user-not-found' });
      return;
    }
    await userDocRef.update({ SID: '' });
    res.status(200).json({ SID: 'empty' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default logout;
