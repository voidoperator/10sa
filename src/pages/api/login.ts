import admin from '@/firebase/firebaseAdmin';
import type { NextApiRequest, NextApiResponse } from 'next';

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwtToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(jwtToken);
    const uid = decodedToken.uid;
    const userDocRef = admin.firestore().collection('users').doc(uid);
    const userDocSnap = await userDocRef.get();

    if (!userDocSnap.exists) {
      res.status(400).json({ error: 'auth/user-not-found' });
      return;
    }

    const userData = userDocSnap.data();
    const SID = userData?.SID;
    if (SID) {
      if (SID !== jwtToken) {
        res.status(400).json({ error: 'invalidSID' });
        return;
      }
    }

    await userDocRef.update({ SID: jwtToken });
    const activeSubscription = userData?.activeSubscription;
    res.status(200).json({ uid, activeSubscription, jwtCookie: jwtToken });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default login;

// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '@/firebase/firebaseClient';
// import admin from '@/firebase/firebaseAdmin';
// import type { NextApiRequest, NextApiResponse } from 'next/types';

// const login = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { jwtToken } = req.body;
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(jwtToken);
//     console.log();
//     const uid = decodedToken.uid;
//     const userDocRef = doc(db, 'users', uid);
//     const userDocSnap = await getDoc(userDocRef);
//     if (!userDocSnap.exists()) {
//       res.status(400).json({ error: 'auth/user-not-found' });
//       return;
//     }
//     const sessionId = userDocSnap.data().sessionId;
//     if (sessionId) {
//       if (userDocSnap.data().sessionId !== jwtToken) {
//         res.status(400).json({ error: 'invalidSessionId' });
//         return;
//       }
//     }
//     await setDoc(userDocRef, { sessionId: jwtToken }, { merge: true });
//     const activeSubscription = userDocSnap.data().activeSubscription;
//     res.status(200).json({ uid, activeSubscription, jwtCookie: jwtToken });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// };

// export default login;
