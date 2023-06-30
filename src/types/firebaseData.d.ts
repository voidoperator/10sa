import type { InputHTMLAttributes } from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LogoutFormValues = {
  email: string;
  password: string;
};

export type ErrorLabelProps = {
  errorMessage: string | undefined | null;
};

export interface RegisterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: 'email' | 'password' | 'confirmPassword';
  label: string;
  type: 'text' | 'email' | 'password';
  errorMessage: string | undefined;
  register: UseFormRegister<any>;
}
