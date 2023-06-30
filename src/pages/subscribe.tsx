import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { useDocument } from 'react-firebase-hooks/firestore';
import Cookies from 'js-cookie';
import { createCheckoutSession } from '@/stripe/createCheckoutSession';
import usePremiumStatus from '@/stripe/usePremiumStatus';

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(user ? user : null);

  const uid = user?.uid;
  const userDocRef = uid ? doc(db, 'users', uid) : undefined;

  const [value, loadingDoc] = useDocument(userDocRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (!loadingDoc && value?.exists) {
      const userSID = value.data()?.SID;
      const cookieSID = Cookies.get('SID');
      if (userSID !== cookieSID) {
        auth.signOut().then(() => router.push('/'));
        return;
      }
      if (userIsPremium) {
        router.push('/form');
        return;
      }
    }
  }, [loadingDoc, router, userIsPremium, value]);

  const handleClick = async () => {
    if (!uid) return;
    setIsLoading(true);
    try {
      await createCheckoutSession(uid);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Subscribe</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <Button onClick={handleClick} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Subscribe'}
        </Button>
      </MainWrapper>
    </MainContainer>
  );
};

export default Payment;
