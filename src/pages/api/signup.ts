import admin from '@/firebase/firebaseAdmin';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: false,
    });

    // Send verification email
    const link = await admin.auth().generateEmailVerificationLink(email);
    // Here you would typically send the link to the user's email using your email provider

    // Save user in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: email,
      SID: '',
    });

    res.status(200).json({ userStatus: 'initialized' });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          res.status(400).json({ error: 'Email already in use.' });
          break;
        default:
          res.status(400).json({ error });
          break;
      }
    } else {
      res.status(400).json({ error });
    }
  }
};

export default signup;

// import admin from '@/firebase/firebaseAdmin';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const signup = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { uid, email } = req.body;

//   try {
//     const user = await admin.firestore().collection('users').doc(uid).set({
//       uid: uid,
//       email: email,
//       SID: '',
//     });
//     res.status(200).json({ userStatus: 'initialized', user });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// export default signup;
