import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/firebase/firebaseClient';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {
  Button,
  FormTag,
  MainContainer,
  MainWrapper,
  ShadowDiv,
  H2,
  GenericContainer,
  StatusText,
  SuccessToast,
  ErrorToast,
  QuestionButton,
  NextLink,
  SmallParagraph,
  LogoContainer,
  PaywallSection,
} from '@/components/TailwindStyled';
import RegisterInput from '@/components/paywall/RegisterInput';
import { loginValidationSchema } from '@/utility/validationSchemas';
import type { LoginFormValues } from '@/types/firebaseData';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { useSetAgency } from '@/hooks/useSetAgency';
import { DoublePlayLogo } from '@/components/icons/DoublePlayLogo';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema),
    mode: 'onTouched',
  });
  const [serverError, setServerError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [needsToVerifyEmail, setNeedsToVerifyEmail] = useState<boolean>(false);
  const [accountDoesntExist, setAccountDoesntExist] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [verifyEmailSent, setVerifyEmailSent] = useState<boolean>(false);
  const [resetPasswordQuestion, setResetPasswordQuestion] = useState<boolean>(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState<boolean>(false);
  const [emailRequired, setEmailRequired] = useState<string>('');
  const [hasRouted, setHasRouted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user);

  useSecureRoute();
  useSetAgency();

  useEffect(() => {
    if (loadingUser && loadingPremium) return;
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, [loadingPremium, loadingUser]);

  useEffect(() => {
    if (success && !loadingPremium && !hasRouted && !loadingUser) {
      if (userIsPremium) {
        setHasRouted(true);
        setTimeout(() => {
          router.replace('/form');
        }, 2000);
      } else {
        setHasRouted(true);
        setTimeout(() => {
          router.replace('/subscribe');
        }, 2000);
      }
    }
  }, [hasRouted, loadingPremium, loadingUser, router, success, userIsPremium]);

  const onSubmitHandler = async (data: LoginFormValues) => {
    const { email, password } = data;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { user } = response;
      const { emailVerified } = user;
      if (!emailVerified) {
        setNeedsToVerifyEmail(true);
        setUserEmail(email);
        return;
      }
      const userIdToken = await user.getIdToken();
      if (userIdToken) {
        try {
          const authResponse = await axios.post('/api/login', { jwtToken: userIdToken });
          const { uid, jwtCookie } = authResponse.data;
          Cookies.set('SID', jwtCookie, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
          });
          Cookies.set('UID', uid, {
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development',
          });
          setSuccess(true);
        } catch (e: any) {
          const { code, message } = e?.response?.data?.error;
          if (code === 'auth/argument-error') {
            console.error('negative... bucko');
          }
          if (e.response.data.error === 'invalidSID') {
            setIsLoggedIn(true);
            return;
          }
          if (e.response.data.error === 'auth/user-not-found') {
            setUserEmail(data.email);
            setAccountDoesntExist(true);
            setTimeout(() => {
              setAccountDoesntExist(false);
            }, 10000);
            return;
          }
          if (!code && !message) console.error('Unhandled error: ', e);
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
            setResetPasswordQuestion(true);
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

  const sendEmailVerificationAgain = async () => {
    if (!user || emailSent) return;
    setEmailSent(true);
    try {
      await sendEmailVerification(user);
      setNeedsToVerifyEmail(false);
      setVerifyEmailSent(true);
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

  if (isLoading) {
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
  }

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Login</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <LogoContainer>
          <DoublePlayLogo twClasses='w-2/3 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
        </LogoContainer>
        <PaywallSection>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <H2>Login</H2>
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
              <Button type='submit' disabled={success}>
                Login
              </Button>
              <SmallParagraph>
                Don&apos;t have an account? <NextLink href='/signup'>Create account</NextLink>
              </SmallParagraph>
              {resetPasswordQuestion && (
                <SmallParagraph>
                  Forgot your password?{' '}
                  <QuestionButton type='button' onClick={sendResetPasswordEmail} disabled={emailSent}>
                    Send reset password email
                  </QuestionButton>
                </SmallParagraph>
              )}
            </ShadowDiv>
            {serverError && (
              <ErrorToast>
                <GenericContainer>{serverError}</GenericContainer>
              </ErrorToast>
            )}
            {accountDoesntExist && (
              <ErrorToast>
                <GenericContainer>An account with that email doesn&apos;t exists.</GenericContainer>
                <GenericContainer>
                  Please <NextLink href='/signup'>create an account.</NextLink>
                </GenericContainer>
              </ErrorToast>
            )}
            {needsToVerifyEmail && (
              <ErrorToast>
                <GenericContainer>
                  The email <span className='font-semibold'>{userEmail}</span> has not been verified yet.
                </GenericContainer>
                <GenericContainer>Please check your inbox then try again.</GenericContainer>
                <br />
                <GenericContainer>
                  Didn&apos;t receive it?{' '}
                  <QuestionButton type='button' disabled={emailSent} onClick={sendEmailVerificationAgain}>
                    Send it again.
                  </QuestionButton>
                </GenericContainer>
              </ErrorToast>
            )}
            {isLoggedIn && (
              <ErrorToast>
                <GenericContainer>
                  Error: This account is currently logged in somewhere else.
                  <br />
                  <br />
                  Either logout from the other session manually or{' '}
                  <NextLink href='/logout'>force logout the other session.</NextLink>
                </GenericContainer>
              </ErrorToast>
            )}
            {verifyEmailSent && (
              <SuccessToast>
                <GenericContainer>
                  A verification email has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email and try again.</GenericContainer>
              </SuccessToast>
            )}
            {resetPasswordEmailSent && (
              <SuccessToast>
                <GenericContainer>
                  A password reset link has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email.</GenericContainer>
              </SuccessToast>
            )}
            {success && (
              <SuccessToast>
                <GenericContainer>
                  Successfully logged in!
                  <br />
                  <br />
                  Checking subscription status...
                </GenericContainer>
              </SuccessToast>
            )}
          </FormTag>
        </PaywallSection>
      </MainWrapper>
    </MainContainer>
  );
};

export default Login;
