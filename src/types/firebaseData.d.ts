import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  agency: string;
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

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface RegisterDropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  errorMessage: string | undefined;
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    name: string;
    ref: (instance: HTMLSelectElement | null) => void;
    value?: any;
  };
}
