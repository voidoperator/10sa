import React, { useEffect, useState } from 'react';
import { useConstantData } from '../contexts/ConstantDataContext';
import { MainLabel, RequiredSpan, ShadowDiv, TextField } from '../../components/TailwindStyled';
import type { LocalStorageInputProps } from '../../types/constantData';

const LocalStorageInput: React.FC<LocalStorageInputProps> = ({
  id,
  labelName,
  placeholder,
  name,
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
