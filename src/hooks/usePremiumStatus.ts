import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebaseClient';

const isUserPremium = async (): Promise<boolean> => {
  await auth?.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  return decodedToken?.claims.stripeRole ? true : false;
};

export const usePremiumStatus = (user: typeof auth.currentUser | undefined) => {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (user) {
        const result = await isUserPremium();
        setPremiumStatus(result);
      }
      setLoading(false);
    };
    checkPremiumStatus();
  }, [user]);

  return [premiumStatus, loading];
};
