import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FormProvider } from '../components/contexts/FormContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/tw/twStyles';
import Seo from '../components/Seo';
import ScriptForm from '../components/form/ScriptForm';
import SideNav from '../components/nav/SideNav';
import Summary from '../components/form/Summary';

const ScriptPage = () => {
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
        <SideNav />
        <ScriptForm />
        <Summary />
      </IndexContainer>
    </FormProvider>
  );
};

export default ScriptPage;
