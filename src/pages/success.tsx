import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';

const Success = () => {
  const router = useRouter();

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Success</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        {/* {loading ? ( */}
        <StatusText>Loading...</StatusText>
        {/* ) : session ? ( */}
        <>
          <h1>Payment Successful!</h1>
          <p>
            Thank you for your payment. Your transaction has been completed, and a receipt for your purchase has been
            emailed to you.
          </p>
          <p>Your payment ID is: ######</p>
        </>
        {/* ) : (
          <StatusText>Something went wrong.</StatusText>
        )} */}
      </MainWrapper>
    </MainContainer>
  );
};

export default Success;
