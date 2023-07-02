import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { H2, MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import Link from 'next/link';

const Success = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Success</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <H2>Payment Successful!</H2>
        <p className='select-none'>
          Your transaction has been completed, and a receipt for your purchase has been emailed to you.
        </p>
        <Link
          href='/form'
          className='text-lg select-none underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
        >
          Click here to access DouplePlay.
        </Link>
      </MainWrapper>
    </MainContainer>
  );
};

export default Success;
