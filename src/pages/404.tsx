import React from 'react';
import Seo from '../components/Seo';
import { MainContainer, MainWrapper, StatusText } from '../components/tw/twStyles';

const NotFoundPage = () => {
  return (
    <MainContainer>
      <Seo subtitle='404: Not Found' />
      <MainWrapper>
        <StatusText>404: Not Found</StatusText>
        <StatusText>You just hit a route that doesn&#39;t exist... the sadness.</StatusText>
      </MainWrapper>
    </MainContainer>
  );
};

export default NotFoundPage;
