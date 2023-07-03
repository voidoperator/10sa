import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { User } from 'firebase/auth';
import { usePremiumStatus } from './usePremiumStatus';
import Cookies from 'js-cookie';
import { useDocument } from 'react-firebase-hooks/firestore';

export const useSecureRoute = (): void => {
  const [user, loadingUser] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user as User);
  const [uidCookie, setUidCookie] = useState<string | undefined>(Cookies.get('UID'));
  const [sidCookie, setSidCookie] = useState<string | undefined>(Cookies.get('SID'));
  const [hasRouted, setHasRouted] = useState<boolean>(false);
  const router = useRouter();

  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const [userDoc, loadingDoc] = useDocument(userDocRef);

  useEffect(() => {
    if (!loadingUser && !loadingPremium && !loadingDoc && !hasRouted) {
      const userDocSid = userDoc?.data()?.SID;
      if (user && uidCookie && sidCookie && userDocSid === sidCookie && userIsPremium && router.pathname !== '/form') {
        setHasRouted(true);
        router.replace('/form');
      } else if (user && uidCookie && sidCookie && !userDocSid && router.pathname !== '/') {
        Cookies.remove('agency');
        Cookies.remove('UID');
        Cookies.remove('SID');
        setHasRouted(true);
        router.replace('/');
      } else if (
        user &&
        uidCookie &&
        sidCookie &&
        userDocSid === sidCookie &&
        !userIsPremium &&
        router.pathname !== '/subscribe'
      ) {
        setHasRouted(true);
        router.replace('/subscribe');
      } else if (
        user &&
        (!uidCookie || !sidCookie || userDocSid !== sidCookie || !userIsPremium) &&
        router.pathname !== '/' &&
        router.pathname !== '/signup'
      ) {
        if (!user) {
          if (router.pathname !== '/') {
            setHasRouted(true);
            router.replace('/');
          }
        }
        if (!sidCookie || !uidCookie) {
          Cookies.remove('UID');
          Cookies.remove('SID');
          setHasRouted(true);
          router.replace('/');
        }
      } else if (!user && (uidCookie || sidCookie) && router.pathname !== '/') {
        Cookies.remove('UID');
        Cookies.remove('SID');
        setHasRouted(true);
        router.replace('/');
      } else if (!user && !uidCookie && !sidCookie && router.pathname === '/form') {
        setHasRouted(true);
        router.replace('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPremium, loadingDoc, sidCookie, uidCookie, hasRouted, userIsPremium, router, userDoc]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setHasRouted(false);
    };
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
};
