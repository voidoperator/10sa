import React from 'react';
import Head from 'next/head';
import LogOutButton from '@/components/paywall/LogOutButton';
import {
  H2,
  LogoContainer,
  MainContainer,
  MainWrapper,
  NextLink,
  NextLinkButton,
  SmallParagraph,
} from '@/components/TailwindStyled';
import { DoublePlayLogo } from '@/components/icons/DoublePlayLogo';

const Success = () => {
  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Success</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <LogoContainer className='pb-12'>
          <DoublePlayLogo twClasses='w-full 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
        </LogoContainer>
        <H2>Payment Successful!</H2>
        <SmallParagraph className='font-medium text-base'>
          Your transaction has been completed and a receipt for your purchase has been emailed to you.
        </SmallParagraph>
        <NextLinkButton href='/form'>Click here to enter DouplePlay</NextLinkButton>
      </MainWrapper>
      <LogOutButton />
    </MainContainer>
  );
};

export default Success;
