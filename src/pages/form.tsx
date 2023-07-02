import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FormProvider } from '../components/contexts/FormContext';
import { ConstantDataProvider } from '../components/contexts/ConstantDataContext';
import { IndexContainer } from '../components/TailwindStyled';
import TopNav from '../components/nav/TopNav';
import SideNav from '../components/nav/SideNav';
import Form from '../components/Form';
import Summary from '../components/summary/Summary';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import { doc, auth, db } from '@/firebase/firebaseClient';
import { useDocument } from 'react-firebase-hooks/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSecureRoute } from '@/hooks/useSecureRoute';

const FormPage = () => {
  useSecureRoute();
  // const [user, loadingUser] = useAuthState(auth);

  // useEffect(() => {
  //   if (loadingUser) return;
  //   console.log(user);
  // }, [loadingUser, user]);

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
    </ConstantDataProvider>
  );
};

export default FormPage;
