import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import {
  Button,
  GenericContainer,
  H2,
  IndexContainer,
  MainContainer,
  MainLabelSpan,
  MainWrapper,
  PaywallSection,
} from '../components/TailwindStyled';
import LogOutButton from '@/components/paywall/LogOutButton';

const Account = () => {
  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Account</title>
      </Head>
      <MainWrapper>
        <PaywallSection>
          <H2>Account Details</H2>
          <MainLabelSpan>Email:</MainLabelSpan>
          <MainLabelSpan>Agency:</MainLabelSpan>
          <Button>Change Password</Button>
          <Button>Change Email</Button>
          <Button>Cancel Subscription</Button>
        </PaywallSection>
      </MainWrapper>
      <LogOutButton />
    </MainContainer>
  );
};

export default Account;
