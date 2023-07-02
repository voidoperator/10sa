import React from 'react';
import { MainLabel, Select } from '../TailwindStyled';
import ErrorLabel from './ErrorLabel';
import type { RegisterDropdownProps } from '@/types/firebaseData';

const RegisterDropdown: React.FC<RegisterDropdownProps> = ({ id, label, errorMessage, field, options, required }) => {
  return (
    <div>
      <MainLabel htmlFor={id}>{label}</MainLabel>
      <div className='relative'>
        {errorMessage && <ErrorLabel errorMessage={errorMessage} />}
        <Select {...field} required={required} id={id}>
          {options.map(({ value, label, disabled = false }, index) => {
            return (
              <option key={value + '_' + index} value={value} disabled={disabled}>
                {label}
              </option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default RegisterDropdown;
