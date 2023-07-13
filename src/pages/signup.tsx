import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSecureRoute } from '@/hooks/useSecureRoute';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import { signupValidationSchema } from '@/utility/validationSchemas';
import { FirebaseError } from 'firebase/app';
import {
  Button,
  FormTag,
  H2,
  MainContainer,
  MainWrapper,
  ShadowDiv,
  GenericContainer,
  StatusText,
  ErrorToast,
  NextLink,
  SuccessToast,
  SmallParagraph,
  LogoContainer,
  PaywallSection,
} from '@/components/TailwindStyled';
import RegisterInput from '@/components/paywall/RegisterInput';
import RegisterDropdown from '@/components/paywall/RegisterDropdown';
import { toTitleCase } from '@/utility/utility';
import { DoublePlayLogo } from '@/components/icons/DoublePlayLogo';
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
  const [serverError, setServerError] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [selectedAgency, setSelectedAgency] = useState<string>('');
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
        }, 15000);
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

  return (
    <MainContainer>
      <Head>
        <title>DoublePlay | Sign Up</title>
      </Head>
      <MainWrapper>
        <LogoContainer>
          <DoublePlayLogo twClasses='w-2/3 4xl:max-w-4xl 3xl:max-w-3xl 2xl:max-w-3xl xl:max-w-2xl lg:max-w-xl hover:opacity-90 transition-all' />
        </LogoContainer>
        <PaywallSection>
          <FormTag onSubmit={handleSubmit(onSubmitHandler)}>
            <H2>Sign Up</H2>
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
                autoComplete='email'
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
              <SmallParagraph>
                Already have an account? <NextLink href='/'>Login</NextLink>
              </SmallParagraph>
            </ShadowDiv>
            <Button type='submit' disabled={verifyEmailSent || hasRouted}>
              Sign Up
            </Button>
            {serverError && <ErrorToast>{serverError}</ErrorToast>}
            {accountExists && (
              <ErrorToast>
                <GenericContainer>
                  An account with the email <span className='font-semibold'>{userEmail}</span> already exists.
                </GenericContainer>
                <GenericContainer>
                  Please proceed to <NextLink href='/'>login.</NextLink>
                </GenericContainer>
              </ErrorToast>
            )}
            {verifyEmailSent && (
              <SuccessToast>
                <GenericContainer>
                  An account has been created for <span className='font-semibold'>{userEmail}</span> under{' '}
                  {selectedAgency}.
                </GenericContainer>
                <GenericContainer>A verification email has been sent.</GenericContainer>
                <GenericContainer>
                  Please check your email and proceed to <NextLink href='/'>login.</NextLink>
                </GenericContainer>
              </SuccessToast>
            )}
          </FormTag>
        </PaywallSection>
      </MainWrapper>
    </MainContainer>
  );
};

export default SignUp;
