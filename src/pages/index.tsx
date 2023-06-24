import React, { useEffect, useState } from 'react';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/tw/twStyles';
import Seo from '../components/Seo';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/form/Form';
import Summary from '../components/form/Summary';

const index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    setIsMobile(windowWidth < 640);
  }, []);

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
            Your screen is too small for this application. Please use a desktop device.
          </StatusText>
        </MainWrapper>
      </MainContainer>
    );

  if (!isLoading && !isMobile)
    return (
      <ConstantDataProvider>
        <FormProvider>
          <Seo subtitle='Script Lead Form' />
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

export default index;
