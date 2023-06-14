import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FormProvider } from '../components/contexts/FormContext';
import { MainContainer, MainWrapper, StatusText, IndexContainer } from '../components/tw/twStyles';
import Seo from '../components/Seo';
import Form from '../components/form/Form';
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
      <MainContainer>
        <MainWrapper>
          <StatusText>Loading...</StatusText>
        </MainWrapper>
      </MainContainer>
    );

  return (
    <FormProvider>
      <Seo subtitle='Lead Form' />
      <IndexContainer>
        <SideNav />
        <Form />
        <Summary />
      </IndexContainer>
    </FormProvider>
  );
};

export default IndexPage;
