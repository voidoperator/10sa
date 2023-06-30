import { useState, useEffect } from 'react';
import { auth } from '@/firebase/firebaseClient';
import isUserPremium from './isUserPremium';

export default function usePremiumStatus(user: typeof auth.currentUser) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async () => {
        setPremiumStatus(await isUserPremium());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
