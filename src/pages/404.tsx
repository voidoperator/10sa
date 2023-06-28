import React from 'react';
import Head from 'next/head';
import { MainContainer, MainWrapper, StatusText } from '../components/TailwindStyled';

const NotFoundPage = () => {
  return (
    <MainContainer>
      <Head>
        <title>10 Steps Ahead || 404: Not Found</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <StatusText>404: Not Found</StatusText>
        <StatusText>You just found a path that doesn&#39;t exist... the sadness.</StatusText>
      </MainWrapper>
    </MainContainer>
  );
};

export default NotFoundPage;
