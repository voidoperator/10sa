import React from 'react';
import { TextField, MainLabel } from '../TailwindStyled';
import ErrorLabel from './ErrorLabel';
import type { RegisterInputProps } from '@/types/firebaseData';

const RegisterInput: React.FC<RegisterInputProps> = ({
  id,
  label,
  type,
  register,
  errorMessage,
  required,
  ...rest
}) => {
  return (
    <div>
      <MainLabel htmlFor={id}>{label}</MainLabel>
      <div className='relative'>
        {errorMessage && <ErrorLabel errorMessage={errorMessage} />}
        <TextField {...register(id)} id={id} type={type} autoCapitalize='off' spellCheck='false' {...rest} />
      </div>
    </div>
  );
};

export default RegisterInput;
