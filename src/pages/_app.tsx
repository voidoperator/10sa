import '@/styles/global.css';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { MainContainer, MainWrapper, StatusText } from '@/components/TailwindStyled';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
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
          <title>DoublePlay | Loading</title>
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
          <title>DoublePlay</title>
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

  return <Component {...pageProps} />;
}

export default App;
