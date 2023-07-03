import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import LogOutButton from '@/components/paywall/LogOutButton';
import { Button, LogoContainer, MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebaseClient';
import { createCheckoutSession } from '@/stripe/createCheckoutSession';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { DoublePlayLogo } from '@/components/icons/DoublePlayLogo';

const Payment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState<boolean>(false);

  const [user, loadingUser] = useAuthState(auth);

  useSecureRoute();

  useEffect(() => {
    if (loadingUser) return;
    setIsLoading(false);
  }, [loadingUser]);

  const handleClick = async () => {
    if (loadingUser || sessionStarted || stripeIsLoading) return;
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
        <LogoContainer className='pb-8'>
          <DoublePlayLogo twClasses='w-full 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
        </LogoContainer>
        <Button onClick={handleClick} disabled={stripeIsLoading}>
          {stripeIsLoading ? 'Loading...' : 'Subscribe'}
        </Button>
      </MainWrapper>
      <LogOutButton />
    </MainContainer>
  );
};

export default Payment;
