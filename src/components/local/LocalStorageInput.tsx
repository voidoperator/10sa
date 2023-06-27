/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useConstantData } from '../contexts/ConstantDataContext';
import { MainLabel, RequiredSpan, ShadowDiv, TextField } from '../../components/TailwindStyled';
import type { LocalStorageInputProps } from '../../types/constantData';

const LocalStorageInput: React.FC<LocalStorageInputProps> = ({
  id,
  labelName,
  placeholder,
  name,
  phone = false,
  required = true,
  uppercase = true,
  useDefault = true,
  defaultKey = '',
  defaultValue = '',
  externalValue,
}) => {
  const { setConstantData } = useConstantData();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    if (useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      setConstantData((prevState) => ({ ...prevState, [defaultKey]: defaultValue }));
    }
  }, [useDefault, defaultKey, defaultValue, value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (phone) {
      value = value.replace(/\D/g, '');
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        value = `${match[1] ? match[1] : ''}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
        value = value.trim().replace(/-$/, '');
      }
    }

    setValue(value);
    setConstantData((prevState) => ({ ...prevState, [defaultKey]: value }));
  };

  return (
    <div className='flex flex-col gap-1'>
      <MainLabel htmlFor={id}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <TextField
        id={id}
        type='text'
        name={name}
        placeholder={placeholder}
        required={required}
        className={uppercase ? 'capitalize' : 'normal-case'}
        onChange={handleChange}
        autoComplete='no'
        value={value}
      />
    </div>
  );
};

export default LocalStorageInput;
