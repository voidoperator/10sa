import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { useDocument } from 'react-firebase-hooks/firestore';
import Cookies from 'js-cookie';
import { createCheckoutSession } from '@/stripe/createCheckoutSession';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import { signOut } from 'firebase/auth';
import { useSecureRoute } from '@/hooks/useSecureRoute';

const Payment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  // const [hasRouted, setHasRouted] = useState<boolean>(false);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);

  // const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  // const [userIsPremium, loadingPremium] = usePremiumStatus(user ? user : null);

  // const userDocRef = user ? doc(db, 'users', user.uid) : undefined;

  // const [value, loadingValue] = useDocument(userDocRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // useEffect(() => {
  //   if (loadingUser || loadingValue || hasRouted) return;
  //   if (value?.exists) {
  //     const userSID = value.data()?.SID;
  //     const cookieSID = Cookies.get('SID');
  //     if (!cookieSID || !user) {
  //       if (user && !cookieSID) {
  //         // signOut(auth);
  //         setIsLoading(false);
  //         return;
  //       }
  //       if (cookieSID && !user) {
  //         Cookies.remove('SID');
  //         Cookies.remove('UID');
  //         setIsLoading(false);
  //         return;
  //       }
  //       router.push('/');
  //       return;
  //     }
  //     if (userSID === cookieSID) {
  //       if (!loadingPremium && userIsPremium) {
  //         setHasRouted(true);
  //         router.push('/form');
  //         return;
  //       }
  //       if (!loadingPremium && !userIsPremium) {
  //         setHasRouted(true);
  //         router.push('/subscribe');
  //         return;
  //       }
  //     } else {
  //       Cookies.remove('SID');
  //       Cookies.remove('UID');
  //       return;
  //     }
  //   }
  //   if (!value?.exists) {
  //     Cookies.remove('SID');
  //     Cookies.remove('UID');
  //     router.push('/');
  //     return;
  //   }
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 450);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loadingUser, loadingValue, loadingPremium, userIsPremium]);

  useSecureRoute();

  useEffect(() => {
    if (loadingUser) return;
    setIsLoading(false);
  }, [loadingUser]);

  const handleClick = async () => {
    if (loadingUser || sessionStarted) return;
    if (!user) return;

    setStripeIsLoading(true);
    try {
      setSessionStarted(true);
      await createCheckoutSession(user.uid);
    } catch (error) {
      console.error('Error: ', error);
      setSessionStarted(false);
      setStripeIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainContainer>
        <Head>
          <title>DoublePlay | Loading</title>
        </Head>
        <MainWrapper>
          <StatusText>Loading... Please wait...</StatusText>
        </MainWrapper>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Subscribe</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <Button onClick={handleClick} disabled={stripeIsLoading}>
          {stripeIsLoading ? 'Loading...' : 'Subscribe'}
        </Button>
      </MainWrapper>
    </MainContainer>
  );
};

export default Payment;
