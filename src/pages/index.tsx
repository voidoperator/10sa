import React, { useEffect, useState } from 'react';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/TailwindStyled';
import Seo from '../components/Seo';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/Form';
import Summary from '../components/summary/Summary';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(640);

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
        <MainWrapper>
          <StatusText>Loading...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (!isLoading && isMobile)
    return (
      <MainContainer>
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

  if (!isLoading && !isMobile)
    return (
      <ConstantDataProvider>
        <FormProvider>
          <Seo subtitle='Lead Form' />
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
