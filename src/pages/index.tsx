import React, { useEffect, useState } from 'react';
import { FormProvider } from '../components/contexts/FormContext';
import { graphql, useStaticQuery } from 'gatsby';
import Seo from '../components/Seo';
import Form from '../components/form/Form';
import { TenStepsAheadLogo } from '../components/icons/TenStepsAheadLogo';
import SideNav from '../components/nav/SideNav';
import Summary from '../components/form/Summary';

const IndexPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // const contentfulData = useStaticQuery(
  //   graphql`
  //     query contentfulQuery {
  //       navbar: contentfulNavBar {
  //         navItems {
  //           title
  //           iconName
  //           hyperlink
  //           id
  //         }
  //       }
  //     }
  //   `,
  // );
  // const { navbar } = contentfulData;

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen py-20'>
        <div className='flex w-full max-w-4xl p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-10sa-purple border-10sa-gold/40 items-center justify-center'>
          <div className='text-xl'>Loading...</div>
        </div>
      </div>
    );

  return (
    <FormProvider>
      <Seo subtitle='10 Steps Ahead - Lead' />
      <div className='flex items-start justify-between min-h-screen'>
        <SideNav />
        <Form />
        <Summary />
      </div>
    </FormProvider>
  );
};

export default IndexPage;
