import '@/styles/global.css';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import type { AppProps } from 'next/app';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import usePremiumStatus from '@/stripe/usePremiumStatus';
// import { auth, db, doc } from '@/firebase/firebaseClient';
// import { useDocument } from 'react-firebase-hooks/firestore';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(640);

  // const router = useRouter();

  // const [user, loadingUser] = useAuthState(auth);
  // const [userIsPremium, loadingPremium] = usePremiumStatus(user ? user : null);

  // const uid = user?.uid;
  // const userDocRef = uid ? doc(db, 'users', uid) : undefined;

  // const [value, loadingDoc] = useDocument(userDocRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // useEffect(() => {
  //   if (loadingUser) return;
  //   const cookieSID = Cookies.get('SID');
  //   if (!cookieSID) {
  //     console.log('signed you out')
  //     auth.signOut();
  //     return;
  //   }
  //   if (!user && cookieSID) {
  //     Cookies.remove('UID');
  //     Cookies.remove('SID');
  //     return;
  //   }
  //   if (!loadingDoc && value?.exists()) {
  //     const userSID = value.data()?.SID;
  //     if (userSID !== cookieSID) {
  //       Cookies.remove('UID');
  //       Cookies.remove('SID');
  //       auth.signOut();
  //       return;
  //     }
  //     if (!loadingPremium && userIsPremium) {
  //       setTimeout(() => {
  //         console.log('routed you back to / index from _APP.TSX');
  //         router.push('/');
  //       }, 1000);
  //       return;
  //     }
  //     if (user && !loadingPremium && !userIsPremium) {
  //       console.log('here');
  //       router.push('/subscribe');
  //       return;
  //     }
  //   }
  // }, [loadingDoc, loadingPremium, loadingUser, router, user, userIsPremium, value]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(windowWidth < 640);
  }, [windowWidth]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <MainContainer>
        <Head>
          <title>DoublePlay | Loading</title>
        </Head>
        <MainWrapper>
          <StatusText>Loading...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (!isLoading && isMobile)
    return (
      <MainContainer>
        <Head>
          <title>DoublePlay</title>
        </Head>
        <MainWrapper>
          <StatusText className='text-sm'>
            Your screen is too small for this application.
            <br />
            <br />
            Please use a desktop device.
          </StatusText>
        </MainWrapper>
      </MainContainer>
    );

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default App;
