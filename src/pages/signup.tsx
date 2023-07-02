import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { signupValidationSchema } from '@/utility/validationSchemas';
import { FirebaseError } from 'firebase/app';
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
  Select,
  MainLabel,
} from '@/components/TailwindStyled';
import RegisterInput from '@/components/paywall/RegisterInput';
import RegisterDropdown from '@/components/paywall/RegisterDropdown';
import { toTitleCase } from '@/utility/utility';
import type { SignUpFormValues } from '@/types/firebaseData';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agency: '',
    },
    resolver: yupResolver(signupValidationSchema),
    mode: 'onTouched',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('julionunez.10sa@gmail.com');
  const [selectedAgency, setSelectedAgency] = useState<string>('10 Steps Ahead');
  const [verifyEmailSent, setVerifyEmailSent] = useState<boolean>(false);
  const [accountExists, setAccountExists] = useState<boolean>(false);
  const [hasRouted, setHasRouted] = useState<boolean>(false);
  const router = useRouter();

  useSecureRoute();

  const onSubmitHandler = async (data: SignUpFormValues) => {
    const { email, password, agency } = data;
    try {
      const response = await axios.post('/api/signup', { email, password, agency });
      if (response.data.userStatus === 'init') {
        setUserEmail(email);
        setSelectedAgency(toTitleCase(agency));
        setVerifyEmailSent(true);
        setHasRouted(true);
        setTimeout(() => {
          router.replace('/');
        }, 5000);
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof FirebaseError) {
        console.log(error.code);
        switch (error.code) {
          case 'auth/email-already-exists':
            setUserEmail(email);
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
      }
      if (error instanceof AxiosError) {
        setServerError(`Error: ${error.response?.data.error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  if (!isLoading)
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
              <Controller
                name='agency'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <RegisterDropdown
                    id='agency'
                    label='Agency'
                    field={field}
                    errorMessage={errors.agency?.message}
                    options={[
                      { value: '', label: 'Please select your agency...', disabled: true },
                      { value: '10_steps_ahead', label: '10 Steps Ahead' },
                      { value: 'diversity_life', label: 'Diversity Life' },
                      { value: 'proper_with_purpose', label: 'Proper With Purpose' },
                      { value: 'legacy_life', label: 'Legacy Life' },
                    ]}
                  />
                )}
              />
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
              <p className='select-none'>
                Already have an account?{' '}
                <Link href='/' className='underline text-blue-400 hover:text-blue-200 transition-colors'>
                  Login
                </Link>
              </p>
            </ShadowDiv>
            <Button type='submit' disabled={verifyEmailSent || hasRouted}>
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
                  An account has been created for <span className='font-semibold'>{userEmail}</span> under{' '}
                  {selectedAgency}.
                </GenericContainer>
                <GenericContainer>A verification email has been sent.</GenericContainer>
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
