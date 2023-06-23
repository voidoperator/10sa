import React, { useEffect, useState } from 'react';
import { FormProvider } from '../components/contexts/FormContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/tw/twStyles';
import Seo from '../components/Seo';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/form/Form';
import Summary from '../components/form/Summary';

const FormTest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  return (
    <FormProvider>
      <Seo subtitle='Script Lead Form' />
      <IndexContainer>
        <TopNav />
        <SideNav />
        <Form />
        <Summary />
      </IndexContainer>
    </FormProvider>
  );
};

export default FormTest;
