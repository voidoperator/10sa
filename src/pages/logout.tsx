import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import RegisterInput from '@/components/paywall/RegisterInput';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { logoutValidationSchema } from '@/utility/validationSchemas';
import { auth } from '../firebase/firebaseClient';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import {
  Button,
  FormSectionContainer,
  FormTag,
  H2,
  MainContainer,
  MainWrapper,
  ShadowDiv,
  GenericContainer,
  StatusText,
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
        <FormSectionContainer>
          <H2>Logout</H2>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <ShadowDiv className='gap-6'>
              <RegisterInput
                id='email'
                label='Email'
                type='email'
                register={register}
                placeholder='Enter your email'
                errorMessage={errors.email?.message || emailRequired}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <RegisterInput
                id='password'
                label='Password'
                type='password'
                register={register}
                placeholder='Enter your password'
                errorMessage={errors.password?.message || wrongPassword}
                required
              />
              <Button type='submit' disabled={isLoggedOut}>
                Logout
              </Button>
              {resetPasswordQuestion || (
                <p>
                  Forgot your password?{' '}
                  <button
                    type='button'
                    className='underline text-blue-400 hover:text-blue-200 transition-colors'
                    onClick={sendResetPasswordEmail}
                    disabled={emailSent}
                  >
                    Send reset password email
                  </button>
                </p>
              )}
            </ShadowDiv>
            {serverError && (
              <ShadowDiv className='bg-orange-600 text-dp-text-primary font-medium border-orange-700 border-2 select-none text-sm'>
                {serverError}
              </ShadowDiv>
            )}
            {accountDoesntExist && (
              <ShadowDiv className='bg-orange-600 text-dp-text-primary font-medium border-orange-700 border-2 select-none text-sm'>
                <GenericContainer>An account with that email doesn&apos;t exists.</GenericContainer>
                <GenericContainer>
                  Please{' '}
                  <Link
                    href='/signup'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                  >
                    create an account.
                  </Link>
                </GenericContainer>
              </ShadowDiv>
            )}
            {resetPasswordEmailSent && (
              <ShadowDiv className='bg-green-600 text-dp-text-primary font-medium border-green-700/75 border-2 select-none text-sm'>
                <GenericContainer>
                  A password reset link has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email.</GenericContainer>
              </ShadowDiv>
            )}
            {isLoggedOut && (
              <ShadowDiv className='bg-green-600 text-dp-text-primary font-medium border-green-700 border-2 select-none text-sm'>
                <GenericContainer>
                  The account for <span className='font-semibold'>{userEmail}</span> has been successfully logged out.
                </GenericContainer>
                <GenericContainer>
                  You&apos;ll be redirected to login shortly... or{' '}
                  <Link
                    href='/'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                  >
                    click here.
                  </Link>
                </GenericContainer>
              </ShadowDiv>
            )}
          </FormTag>
        </FormSectionContainer>
      </MainWrapper>
    </MainContainer>
  );
};

export default Logout;
