import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { IndexContainer } from '../components/TailwindStyled';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/Form';
import Summary from '../components/summary/Summary';
import usePremiumStatus from '@/stripe/usePremiumStatus';
import { doc, auth, db } from '@/firebase/firebaseClient';
import { useDocument } from 'react-firebase-hooks/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

const Index = () => {
  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user ? user : null);

  const uid = user?.uid;
  const userDocRef = uid ? doc(db, 'users', uid) : undefined;

  const [value, loadingDoc] = useDocument(userDocRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (loadingUser) return;
    if (!user) {
      router.push('/');
    }
    const cookieSID = Cookies.get('SID');
    if (!cookieSID) {
      auth.signOut().then(() => router.push('/'));
      return;
    }
    if (!loadingDoc && value?.exists()) {
      const userSID = value.data()?.SID;
      if (userSID !== cookieSID) {
        router.push('/');
        return;
      }
      if (!loadingPremium && userIsPremium) {
        return;
      }
      if (!loadingPremium && !userIsPremium) {
        router.push('/subscribe');
        return;
      }
    }
  }, [loadingDoc, loadingPremium, loadingUser, router, user, userIsPremium, value]);

  return (
    <ConstantDataProvider>
      <Head>
        <title>DoublePlay | Lead Form</title>
      </Head>
      <FormProvider>
        <IndexContainer>
          <TopNav />
          <SideNav />
          <Form />
          <Summary />
        </IndexContainer>
      </FormProvider>
    </ConstantDataProvider>
  );
};

export default Index;
