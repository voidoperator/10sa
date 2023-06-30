import admin from '@/firebase/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, email } = req.body;

  try {
    const user = await admin.firestore().collection('users').doc(uid).set({
      uid: uid,
      email: email,
      SID: '',
    });
    res.status(200).json({ userStatus: 'initialized', user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default signup;

// import { db } from '@/firebase/firebaseClient';
// import { doc, setDoc } from 'firebase/firestore';
// import type { NextApiRequest, NextApiResponse } from 'next';

// const signup = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { uid, email } = req.body;

//   try {
//     const user = await setDoc(doc(db, 'users', uid), {
//       uid: uid,
//       email: email,
//       activeSubscription: false,
//       sessionId: '',
//     });
//     res.status(200).json({ userStatus: 'initialized', user });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// export default signup;
