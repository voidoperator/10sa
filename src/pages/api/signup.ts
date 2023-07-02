import admin from '@/firebase/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, agency } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: false,
    });

    // Send verification email
    const link = await admin.auth().generateEmailVerificationLink(email);

    // init user with form info
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      agency: agency,
      SID: '',
    });

    res.status(200).json({ userStatus: 'init' });
  } catch (error: unknown) {
    res.status(400).json({ error });
  }
};

export default signup;
