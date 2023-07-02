import { useState, useEffect } from 'react';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';

export const useSetAgency = () => {
  const [user, loading, error] = useAuthState(auth);
  const [agency, setAgency] = useState<string>('');

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error('Firebase auth error:', error);
      return;
    }
    if (!user) return;
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const agency = userData?.agency;
        if (agency) {
          setAgency(agency);
          localStorage.setItem('agency', agency);
          Cookies.set('agency', agency);
        }
      }
    };

    fetchData();
  }, [loading, error, user]);

  return { agency, setAgency };
};
