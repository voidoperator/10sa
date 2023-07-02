import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';
import { useDocument } from 'react-firebase-hooks/firestore';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { signupValidationSchema } from '@/utility/validationSchemas';
import { FirebaseError } from 'firebase/app';
import { auth, db, doc } from '@/firebase/firebaseClient';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
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
import RegisterInput from '@/components/paywall/RegisterInput';
import type { SignUpFormValues } from '@/types/firebaseData';
import { useSecureRoute } from '@/hooks/useSecureRoute';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signupValidationSchema),
    mode: 'onTouched',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [verifyEmailSent, setVerifyEmailSent] = useState<boolean>(false);
  const [accountExists, setAccountExists] = useState<boolean>(false);
  const [hasRouted, setHasRouted] = useState<boolean>(false);

  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  const [userIsPremium, loadingPremium] = usePremiumStatus(user ? user : null);

  // useEffect(() => {
  //   if (loadingUser) return;
  //   console.log(user);
  // }, [loadingUser, user]);

  // const uid = user?.uid;
  // const userDocRef = uid ? doc(db, 'users', uid) : undefined;

  // const [value, loadingValue] = useDocument(userDocRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  // const userDocRef = user ? doc(db, 'users', user.uid) : undefined;

  // const [value, loadingValue] = useDocument(userDocRef, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  useSecureRoute();

  useEffect(() => {
    if (loadingUser) return;
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  }, [loadingUser]);

  // useEffect(() => {
  //   if (loadingUser || loadingValue || hasRouted) return;
  //   if (value?.exists) {
  //     const userSID = value.data()?.SID;
  //     const cookieSID = Cookies.get('SID');
  //     if (!cookieSID || !user) {
  //       if (user && !cookieSID) {
  //         signOut(auth);
  //         setIsLoading(false);
  //         return;
  //       }
  //       if (cookieSID && !user) {
  //         Cookies.remove('SID');
  //         Cookies.remove('UID');
  //         setIsLoading(false);
  //         return;
  //       }
  //       router.push('/');
  //       return;
  //     }
  //     if (userSID === cookieSID) {
  //       if (!loadingPremium && userIsPremium) {
  //         setHasRouted(true);
  //         router.push('/form');
  //         return;
  //       }
  //       if (!loadingPremium && !userIsPremium) {
  //         setHasRouted(true);
  //         router.push('/subscribe');
  //         return;
  //       }
  //     } else {
  //       Cookies.remove('SID');
  //       Cookies.remove('UID');
  //       signOut(auth);
  //       return;
  //     }
  //   }
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 450);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loadingUser, loadingValue, loadingPremium, userIsPremium]);

  const onSubmitHandler = async (data: SignUpFormValues) => {
    const { email, password } = data;
    try {
      const response = await axios.post('/api/signup', { email, password });
      if (response.data.userStatus === 'initialized') {
        setUserEmail(email);
        setVerifyEmailSent(true);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setUserEmail(data.email);
            setAccountExists(true);
            setTimeout(() => {
              setAccountExists(false);
            }, 30000);
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

  // const onSubmitHandler = async (data: SignUpFormValues) => {
  //   const { email, password } = data;
  //   try {
  //     const response = await createUserWithEmailAndPassword(auth, email, password);
  //     const { user } = response;
  //     if (user) {
  //       await sendEmailVerification(user);
  //       try {
  //         const initUserResponse = await axios.post('/api/signup', { uid: user.uid, email: user.email });
  //         if (initUserResponse.data.userStatus === 'initialized') {
  //           signOut(auth);
  //         } else {
  //           console.error('Could not log user out.');
  //         }
  //       } catch (error) {
  //         console.log('Unhandled error: ', error);
  //       }
  //     }
  //     if (user.email) {
  //       setUserEmail(user.email);
  //     }
  //     if (!user.emailVerified) {
  //       setVerifyEmailSent(true);
  //     }
  //   } catch (error: unknown) {
  //     if (error instanceof FirebaseError) {
  //       switch (error.code) {
  //         case 'auth/email-already-in-use':
  //           setUserEmail(data.email);
  //           setAccountExists(true);
  //           setTimeout(() => {
  //             setAccountExists(false);
  //           }, 30000);
  //           break;
  //         default:
  //           setServerError(`Error ${error.message}`);
  //           console.error(error);
  //           break;
  //       }
  //     } else {
  //       console.error(error);
  //     }
  //   }
  // };

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
        <title>DoublePlay | Sign Up</title>
      </Head>
      <MainWrapper>
        <FormSectionContainer>
          <H2>Sign Up</H2>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <ShadowDiv className='gap-6'>
              <RegisterInput
                id='email'
                label='Email'
                type='email'
                register={register}
                placeholder='Enter your email: You will need to verify it'
                errorMessage={errors.email?.message}
                required
              />
              <RegisterInput
                id='password'
                label='Password'
                type='password'
                register={register}
                placeholder='Minimum 8 characters with a special symbol'
                errorMessage={errors.password?.message}
                autoComplete='off'
                required
              />
              <RegisterInput
                id='confirmPassword'
                label='Confirm Password'
                type='password'
                register={register}
                placeholder='Confirm your password'
                errorMessage={errors.confirmPassword?.message}
                autoComplete='off'
                required
              />
              <p>
                Already have an account?{' '}
                <Link href='/' className='underline text-blue-400 hover:text-blue-200 transition-colors'>
                  Login
                </Link>
              </p>
            </ShadowDiv>
            <Button type='submit' disabled={verifyEmailSent}>
              Sign Up
            </Button>
            {serverError && (
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
                {serverError}
              </ShadowDiv>
            )}
            {accountExists && (
              <ShadowDiv className='bg-orange-600 text-white font-medium border-orange-700 border-2 select-none text-sm'>
                <GenericContainer>
                  An account with the email <span className='font-semibold'>{userEmail}</span> already exists.
                </GenericContainer>
                <GenericContainer>
                  Please proceed to{' '}
                  <Link
                    href='/'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                  >
                    login.
                  </Link>
                </GenericContainer>
              </ShadowDiv>
            )}
            {verifyEmailSent && (
              <ShadowDiv className='bg-green-600 text-white font-medium border-green-700 border-2 select-none text-sm'>
                <GenericContainer>
                  A verification email has been sent to <span className='font-semibold'>{userEmail}</span>.
                </GenericContainer>
                <GenericContainer>
                  Please check your email and proceed to{' '}
                  <Link
                    href='/'
                    className='underline text-blue-700 font-semibold hover:text-blue-900 transition-colors'
                  >
                    login.
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

export default SignUp;
