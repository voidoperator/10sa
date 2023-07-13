import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import RegisterInput from '@/components/paywall/RegisterInput';
import Cookies from 'js-cookie';
import { logoutValidationSchema } from '@/utility/validationSchemas';
import { auth } from '../firebase/firebaseClient';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { DoublePlayLogo } from '@/components/icons/DoublePlayLogo';
import {
  Button,
  FormTag,
  H2,
  MainContainer,
  MainWrapper,
  ShadowDiv,
  GenericContainer,
  StatusText,
  SmallParagraph,
  QuestionButton,
  ErrorToast,
  SuccessToast,
  NextLink,
  PaywallSection,
  LogoContainer,
} from '@/components/TailwindStyled';
import type { LogoutFormValues } from '@/types/firebaseData';

const Logout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogoutFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(logoutValidationSchema),
    mode: 'onTouched',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [wrongPassword, setWrongPassword] = useState<string>('');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);
  const [accountDoesntExist, setAccountDoesntExist] = useState<boolean>(false);
  const [resetPasswordQuestion, setResetPasswordQuestion] = useState<boolean>(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState<boolean>(false);
  const [emailRequired, setEmailRequired] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmitHandler = async (data: LogoutFormValues) => {
    await signOut(auth);
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;
      if (user) {
        try {
          const logoutResponse = await axios.post('/api/logout', { uid: user.uid });
          const { SID } = logoutResponse.data;
          if (SID === 'empty') {
            localStorage.removeItem('agency');
            Cookies.remove('agency');
            Cookies.remove('UID');
            Cookies.remove('SID');
            await signOut(auth);
            setIsLoggedOut(true);
            setUserEmail(email);
            setTimeout(() => {
              router.replace('/');
            }, 7000);
            return;
          }
        } catch (error) {
          setServerError(
            'An unknown error has occurred. Please check the console error & conctact your admistrator or try again.',
          );
          setTimeout(() => {
            setServerError('');
          }, 20000);
          console.error(error);
        }
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
            setWrongPassword('Wrong password');
            setTimeout(() => {
              setWrongPassword('');
            }, 2000);
            break;
          case 'auth/user-not-found':
            setUserEmail(data.email);
            setAccountDoesntExist(true);
            setTimeout(() => {
              setAccountDoesntExist(false);
            }, 10000);
            break;
          case 'auth/too-many-requests':
            setServerError(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
            );
            break;
          default:
            setServerError(`Error ${error.message}`);
            console.error(error);
            break;
        }
      } else {
        console.error(error);
      }
    }
  };

  const sendResetPasswordEmail = async () => {
    if (emailSent) return;
    if (!userEmail) {
      setEmailRequired('Your email is required.');
      setTimeout(() => {
        setEmailRequired('');
      }, 6000);
      return;
    }
    setEmailSent(true);
    try {
      await sendPasswordResetEmail(auth, userEmail);
      setServerError('');
      setResetPasswordQuestion(false);
      setResetPasswordEmailSent(true);
      setEmailSent(false);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            setServerError(`An account with that email does not exist.`);
            setTimeout(() => {
              setServerError('');
            }, 20000);
            break;
          default:
            setServerError(`Error ${error.message}`);
            console.error(error);
            break;
        }
      }
    }
  };

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

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Logout</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <LogoContainer>
          <DoublePlayLogo twClasses='w-2/3 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
        </LogoContainer>
        <PaywallSection>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <H2>Logout</H2>
            <ShadowDiv className='gap-6'>
              <RegisterInput
                id='email'
                label='Email'
                type='email'
                register={register}
                placeholder='Enter your email'
                errorMessage={errors.email?.message || emailRequired}
                onChange={(e) => setUserEmail(e.target.value)}
                autoComplete='email'
                required
              />
              <RegisterInput
                id='password'
                label='Password'
                type='password'
                register={register}
                placeholder='Enter your password'
                errorMessage={errors.password?.message || wrongPassword}
                autoComplete='password'
                required
              />
              <Button type='submit' disabled={isLoggedOut}>
                Logout
              </Button>
              {!resetPasswordQuestion || (
                <SmallParagraph>
                  Forgot your password?{' '}
                  <QuestionButton type='button' onClick={sendResetPasswordEmail} disabled={emailSent}>
                    Send reset password email
                  </QuestionButton>
                </SmallParagraph>
              )}
            </ShadowDiv>
            {serverError && <ErrorToast>{serverError}</ErrorToast>}
            {accountDoesntExist && (
              <ErrorToast>
                <GenericContainer>An account with that email doesn&apos;t exists.</GenericContainer>
                <GenericContainer>
                  Please <NextLink href='/signup'>create an account.</NextLink>
                </GenericContainer>
              </ErrorToast>
            )}
            {resetPasswordEmailSent && (
              <SuccessToast>
                <GenericContainer>
                  A password reset link has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email.</GenericContainer>
              </SuccessToast>
            )}
            {isLoggedOut && (
              <SuccessToast>
                <GenericContainer>
                  The account for <span className='font-semibold'>{userEmail}</span> has been successfully logged out.
                </GenericContainer>
                <GenericContainer>
                  You&apos;ll be redirected to login shortly... or <NextLink href='/'>click here.</NextLink>
                </GenericContainer>
              </SuccessToast>
            )}
          </FormTag>
        </PaywallSection>
      </MainWrapper>
    </MainContainer>
  );
};

export default Logout;
