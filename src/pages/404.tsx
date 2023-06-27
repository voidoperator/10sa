import React from 'react';
import Seo from '../components/Seo';
import { MainContainer, MainWrapper, StatusText } from '../components/TailwindStyled';

const NotFoundPage = () => {
  return (
    <MainContainer>
      <Seo subtitle='404: Not Found' />
      <MainWrapper className='flex-col gap-6'>
        <StatusText>404: Not Found</StatusText>
        <StatusText>You just found a path that doesn&#39;t exist... the sadness.</StatusText>
      </MainWrapper>
    </MainContainer>
  );
};

export default NotFoundPage;
