// userPremiumStatus.ts
import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebaseClient';
import isUserPremium from './isUserPremium';

export default function usePremiumStatus(user: typeof auth.currentUser) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async () => {
        const result = await isUserPremium();
        setPremiumStatus(result);
        setLoading(false);
      };
      checkPremiumStatus();
    }
  }, [user]);

  return [premiumStatus, loading];
}
