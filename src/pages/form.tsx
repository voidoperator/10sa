import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { IndexContainer } from '../components/TailwindStyled';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/Form';
import Summary from '../components/summary/Summary';
import LogOutButton from '@/components/paywall/LogOutButton';

const FormPage = () => {
  useSecureRoute();

  return (
    <ConstantDataProvider>
      <Head>
        <title>DoublePlay | Lead Form</title>
      </Head>
      <FormProvider>
        <IndexContainer>
          <TopNav />
          <SideNav />
          <Form />
          <Summary />
        </IndexContainer>
      </FormProvider>
      <LogOutButton />
    </ConstantDataProvider>
  );
};

export default FormPage;
