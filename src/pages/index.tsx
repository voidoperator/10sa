import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/TailwindStyled';
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
        <Head>
          <title>10 Steps Ahead || Loading</title>
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
          <title>10 Steps Ahead</title>
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

  if (!isLoading && !isMobile)
    return (
      <ConstantDataProvider>
        <FormProvider>
          <Head>
            <title>10 Steps Ahead || Lead Form</title>
          </Head>
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
