import React, { ErrorInfo, ReactNode } from 'react';
import Head from 'next/head';
import { Button, MainContainer, MainWrapper, StatusText } from './TailwindStyled';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleClearLocalStorage = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  render() {
    if (this.state.hasError) {
      return (
        <MainContainer>
          <Head>
            <title>DoublePlay | Error</title>
          </Head>
          <MainWrapper className='flex-col gap-6'>
            <StatusText className='text-red-500 font-semibold'>Error: Something went wrong.</StatusText>
            <StatusText>Please send the error message in your console to the administrator.</StatusText>
            <StatusText className='text-lg'>
              {`To open the developer console in Google Chrome, open the Chrome Menu in the upper-right-hand corner of the browser window and select More Tools > Developer Tools.`}
            </StatusText>
            <StatusText>
              You can also use <span className='font-bold'>{`Option + ⌘ + J`}</span> (on macOS),
              <br /> or <span className='font-bold'>Shift + CTRL + J</span>
              {` (on Windows/Linux).`}
            </StatusText>
            <StatusText>After taking note of the error message, try resetting everything the button below.</StatusText>
            <StatusText className='font-bold text-red-500'>
              WARNING: YOUR FORM AND ALL THE INFORMATION ON IT WILL BE DELETED!
            </StatusText>
            <Button className='bg-orange-500' onClick={this.handleClearLocalStorage}>
              Clear Local Storage
            </Button>
          </MainWrapper>
        </MainContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
