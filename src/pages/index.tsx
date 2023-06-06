import * as React from 'react';
import { FormProvider } from '../components/contexts/FormContext';
import { graphql, useStaticQuery } from 'gatsby';
import Seo from '../components/Seo';
import Form from '../components/form/Form';

const IndexPage = () => {
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
  return (
    <FormProvider>
      <Seo subtitle='10 Steps Ahead - Lead' />
      <Form />
    </FormProvider>
  );
};

export default IndexPage;
