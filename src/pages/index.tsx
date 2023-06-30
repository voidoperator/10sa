import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FirebaseError } from 'firebase/app';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {
  Button,
  FormSectionContainer,
  FormTag,
  MainContainer,
  MainWrapper,
  ShadowDiv,
  H2,
  GenericContainer,
} from '@/components/TailwindStyled';
import Link from 'next/link';
import RegisterInput from '@/components/paywall/RegisterInput';
import { loginValidationSchema } from '@/utility/validationSchemas';
import type { LoginFormValues } from '@/types/firebaseData';
import usePremiumStatus from '@/stripe/usePremiumStatus';
import { useDocument } from 'react-firebase-hooks/firestore';

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

  const router = useRouter();
  const [user] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user ? user : null);

  // const userIsPremium = usePremiumStatus(user ? user : null);

  // const uid = user?.uid;
  // const userDocRef = uid ? doc(db, 'users', uid) : undefined;

  // const [value, loadingDoc] = useDocument(userDocRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // useEffect(() => {
  //   if (!loadingDoc && value?.exists) {
  //     const userSID = value.data()?.SID;
  //     const cookieSID = Cookies.get('SID');
  //     if (userSID !== cookieSID) {
  //       auth.signOut();
  //       return;
  //     }
  //     if (userIsPremium) {
  //       router.push('/form');
  //       return;
  //     }
  //   }
  // }, [loadingDoc, router, userIsPremium, value]);

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
          if (!loadingPremium && userIsPremium) {
            router.push('/form');
            return;
          }
          if (!loadingPremium && !userIsPremium) {
            router.push('/subscribe');
            return;
          }
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

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Login</title>
      </Head>
      <MainWrapper className='flex-col gap-6'>
        <FormSectionContainer>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <H2>Login</H2>
            <ShadowDiv className='gap-6'>
              <RegisterInput
                id='email'
                label='Email'
                type='email'
                register={register}
                placeholder='Enter your email'
                autoComplete='username'
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
                autoComplete='current-password'
                errorMessage={errors.password?.message || wrongPassword}
                required
              />
              <Button type='submit' disabled={success}>
                Login
              </Button>
              <p>
                Don&apos;t have an account?{' '}
                <Link href='/signup' className='underline text-blue-400 hover:text-blue-200 transition-colors'>
                  Create account
                </Link>
              </p>
              {resetPasswordQuestion && (
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
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
                {serverError}
              </ShadowDiv>
            )}
            {accountDoesntExist && (
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
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
            {needsToVerifyEmail && (
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
                <GenericContainer>
                  The email <span className='font-semibold'>{userEmail}</span> has not been verified yet.
                </GenericContainer>
                <GenericContainer>Please check your inbox then try again.</GenericContainer>
                <br />
                <GenericContainer>
                  Didn&apos;t receive it?{' '}
                  <button
                    type='button'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                    disabled={emailSent}
                    onClick={sendEmailVerificationAgain}
                  >
                    Send it again.
                  </button>
                </GenericContainer>
              </ShadowDiv>
            )}
            {isLoggedIn && (
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
                <GenericContainer>
                  Error: This account is currently logged in somewhere else.
                  <br />
                  <br />
                  Either logout from the other session manually or{' '}
                  <Link
                    href='/logout'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                  >
                    force logout the other session.
                  </Link>
                </GenericContainer>
              </ShadowDiv>
            )}
            {verifyEmailSent && (
              <ShadowDiv className='bg-green-600 text-white font-medium border-green-700/75 border-2 select-none text-sm'>
                <GenericContainer>
                  A verification email has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email and try again.</GenericContainer>
              </ShadowDiv>
            )}
            {resetPasswordEmailSent && (
              <ShadowDiv className='bg-green-600 text-white font-medium border-green-700/75 border-2 select-none text-sm'>
                <GenericContainer>
                  A password reset link has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>Please check your email.</GenericContainer>
              </ShadowDiv>
            )}
            {success && (
              <ShadowDiv className='bg-green-600 text-white font-medium border-green-700 border-2 select-none text-sm'>
                <GenericContainer>
                  Successfully logged in!
                  <br />
                  <br />
                  Checking subscription status...
                </GenericContainer>
              </ShadowDiv>
            )}
          </FormTag>
        </FormSectionContainer>
      </MainWrapper>
    </MainContainer>
  );
};

export default Login;
