import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { User } from 'firebase/auth';
import { usePremiumStatus } from './usePremiumStatus';
import Cookies from 'js-cookie';
import { getDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
// import { useDocument } from 'react-firebase-hooks/firestore';

export const useSecureRoute = (): void => {
  const [user, loadingUser] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user as User);
  const [uidCookie, setUidCookie] = useState<string | undefined>(Cookies.get('UID'));
  const [sidCookie, setSidCookie] = useState<string | undefined>(Cookies.get('SID'));
  // const [userDocSid, setUserDocSid] = useState<string | null>(null);
  const [userDocLoading, setUserDocLoading] = useState<boolean>(true);
  const [hasRouted, setHasRouted] = useState<boolean>(false);
  const router = useRouter();

  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const [userDoc, loadingDoc, error] = useDocument(userDocRef);

  const usePrevious = (value: any) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };
  const prevLoadingUser = usePrevious(loadingUser);
  const prevLoadingPremium = usePrevious(loadingPremium);
  const prevloadingDoc = usePrevious(loadingDoc);
  const prevsidCookie = usePrevious(sidCookie);
  const prevuidCookie = usePrevious(uidCookie);
  const prevhasRouted = usePrevious(hasRouted);
  const prevuser = usePrevious(user);
  const prevuserIsPremium = usePrevious(userIsPremium);
  const prevrouter = usePrevious(router);
  const prevuserDoc = usePrevious(userDoc);

  // console.log('%cloadingUser: ', 'color:yellow', loadingUser);
  // console.log('%cuser: ', 'color:yellow', user);
  // console.log('%cuidCookie: ', 'color:yellow', !!uidCookie);
  // console.log('%csidCookie: ', 'color:yellow', !!sidCookie);
  // console.log('%cuserDocLoading: ', 'color:yellow', userDocLoading);
  // console.log('%cuserDocSid: ', 'color:yellow', !!userDocSid);
  // console.log('%cloadingPremium: ', 'color:yellow', loadingPremium);
  // console.log('%cuserIsPremium: ', 'color:yellow', userIsPremium);
  // console.log('%chasRouted: ', 'color:yellow', hasRouted);
  // console.log('%cCurrent:router.pathname: ', 'color:yellow', router.pathname);

  // useEffect(() => {
  //   if (!user) return;
  //   console.log(user.uid);
  //   const userDocRef = user ? doc(db, 'users', user.uid) : null;
  //   console.log(userDoc?.data());
  // }, [user, userDoc]);

  // useEffect(() => {
  //   if (loadingUser) return;
  //   const fetchUserDoc = async () => {
  //     if (!user) return;
  //     const userDocRef = doc(db, 'users', user?.uid);
  //     const userDoc = await getDoc(userDocRef);
  //     if (userDoc.exists()) {
  //       setUserDocSid(userDoc.data()?.SID);
  //       setUserDocLoading(false);
  //     } else {
  //       setUserDocLoading(false);
  //       console.error('No user found in Firestore.');
  //     }
  //   };
  //   fetchUserDoc();
  // }, [user, loadingUser]);

  useEffect(() => {
    if (loadingUser !== prevLoadingUser) {
      console.log('loadingUser changed');
    }
    if (loadingPremium !== prevLoadingPremium) {
      console.log('loadingPremium changed');
    }
    if (loadingDoc !== prevloadingDoc) {
      console.log('loadingDoc changed');
    }
    if (sidCookie !== prevsidCookie) {
      console.log('sidCookie changed');
    }
    if (uidCookie !== prevuidCookie) {
      console.log('uidCookie changed');
    }
    if (hasRouted !== prevhasRouted) {
      console.log('hasRouted changed');
    }
    if (user !== prevuser) {
      console.log('user changed');
    }
    if (userIsPremium !== prevuserIsPremium) {
      console.log('userIsPremium changed');
    }
    if (router !== prevrouter) {
      console.log('router changed');
    }
    if (userDoc !== prevuserDoc) {
      console.log('userDoc changed');
    }
    console.log('6');
    if (!loadingUser && !loadingPremium && !loadingDoc && !hasRouted) {
      const userDocSid = userDoc?.data()?.SID;
      console.log(userDocSid);
      console.log(userDoc);
      console.log(userDoc?.data());
      console.log(userDoc?.data()?.SID);
      console.log('7');
      if (user && uidCookie && sidCookie && userDocSid === sidCookie && userIsPremium && router.pathname !== '/form') {
        console.log('8');
        setHasRouted(true);
        router.push('/form');
      } else if (user && uidCookie && sidCookie && !userDocSid && router.pathname !== '/') {
        console.log('%cloadingUser: ', 'color:yellow', loadingUser);
        console.log('%cuser: ', 'color:yellow', user);
        console.log('%cuidCookie: ', 'color:yellow', !!uidCookie);
        console.log('%csidCookie: ', 'color:yellow', !!sidCookie);
        console.log('%cuserDocLoading: ', 'color:yellow', loadingDoc);
        console.log('%cuserDocSid: ', 'color:yellow', !!userDoc);
        console.log('%cloadingPremium: ', 'color:yellow', loadingPremium);
        console.log('%cuserIsPremium: ', 'color:yellow', userIsPremium);
        console.log('%chasRouted: ', 'color:yellow', hasRouted);
        console.log('%cCurrent:router.pathname: ', 'color:yellow', router.pathname);
        console.log('18');
        Cookies.remove('UID');
        Cookies.remove('SID');
        setHasRouted(true);
        router.push('/');
      } else if (
        user &&
        uidCookie &&
        sidCookie &&
        userDocSid === sidCookie &&
        !userIsPremium &&
        router.pathname !== '/subscribe'
      ) {
        console.log('9');
        setHasRouted(true);
        router.push('/subscribe');
      } else if (
        user &&
        (!uidCookie || !sidCookie || userDocSid !== sidCookie || !userIsPremium) &&
        router.pathname !== '/'
      ) {
        console.log('10');
        if (!user) {
          if (router.pathname !== '/') {
            console.log('11');
            setHasRouted(true);
            router.push('/');
          }
        }
        if (!sidCookie || !uidCookie) {
          console.log('19');
          Cookies.remove('UID');
          Cookies.remove('SID');
          setHasRouted(true);
          router.push('/');
        }
      } else if (!user && (uidCookie || sidCookie) && router.pathname !== '/') {
        console.log('12');
        Cookies.remove('UID');
        Cookies.remove('SID');
        setHasRouted(true);
        router.push('/');
      } else if (!user && !uidCookie && !sidCookie && router.pathname === '/form') {
        console.log('15');
        setHasRouted(true);
        router.push('/');
      }
    }
    console.log('exit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPremium, loadingDoc, sidCookie, uidCookie, hasRouted, userIsPremium, router, userDoc]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      console.log('13');
      setHasRouted(false);
    };
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
};
