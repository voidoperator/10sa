import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import type { FormDataType, TextInputProps } from '../../types/formData';

const TextInput: React.FC<TextInputProps> = ({
  id,
  labelName,
  placeholder,
  type,
  name,
  pattern,
  required = false,
  additional = false,
  zip_code = false,
  currency = false,
  phone = false,
  socialSecurity = false,
  routingNumber = false,
  accountNumber = false,
  height = false,
  weight = false,
  currencyMutual = false,
  useDefault = false,
  defaultKey = '',
  defaultValue = '',
  externalValue,
}) => {
  const [value, setValue] = useState<string>('');
  const { formData, setFormData } = useFormData();

  useEffect(() => {
    if (useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      setFormData({ ...formData, [defaultKey]: defaultValue });
    }
  }, [useDefault, defaultKey, defaultValue, value]);

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (currency) {
      value = value.replace(/[^0-9.]/g, '');
      let decimalPart = '';
      if (value.includes('.')) {
        const [integerPart, decimal] = value.split('.');
        decimalPart = '.' + decimal.substring(0, 2);
        value = integerPart;
      }
      if (value === '') {
        value = '';
      } else {
        const numericValue = Number(value);
        value = new Intl.NumberFormat('en-US').format(numericValue);
        value = `$${value}${decimalPart}`;
      }
    }

    if (zip_code) {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 5);
    }

    if (routingNumber) {
      value = value.replace(/\D/g, '');
      if (value.length > 9) {
        value = value.substring(0, 9);
      }
      const match = value.match(/^(\d{0,9})$/);
      if (match) {
        value = `${match[1] ? match[1] : ''}`;
        value = value.trim();
      }
    }

    if (accountNumber) {
      value = value.replace(/\D/g, '');
      if (value.length > 17) {
        value = value.substring(0, 17);
      }
      const match = value.match(/^(\d{4,17})$/);
      if (match) {
        value = `${match[1] ? match[1] : ''}`;
        value = value.trim();
      }
    }

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

    if (socialSecurity) {
      value = value.replace(/\D/g, '');
      if (value.length > 9) {
        value = value.substring(0, 9);
      }
      const match = value.match(/^(\d{1,3})(\d{0,2})(\d{0,4})?$/);
      if (match) {
        value = `${match[1] ? match[1] : ''}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
      }
    }

    if (height) {
      value = value.replace(/\D/g, '');
      if (value.length > 3) {
        value = value.substring(0, 3);
      }
      const match = value.match(/^(\d{0,1})(\d{0,2})$/);
      if (match) {
        value = `${match[1]}'${match[2]}`;
        value = value.trim().replace(/'$/, '');
      }
    }

    if (weight) {
      value = value.replace(/[^0-9.]/g, '');
      if (value.includes('.')) {
        const [integerPart, decimalPart] = value.split('.');
        value = integerPart.substring(0, 3) + '.' + decimalPart.substring(0, 1);
      } else {
        value = value.substring(0, 3);
      }
    }

    setValue(value);
    if (additional && typeof id === 'number') {
      const dependentIndex = id;
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [name]: value,
      };
      setFormData({ ...formData, additional_insured_list: additionalInsuredList });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!currencyMutual) return;

    let numValue = parseInt(event.target.value.replace(/[^0-9]/g, ''), 10);

    if (isNaN(numValue)) {
      setValue('');
      const newFormData = { ...formData };
      delete newFormData[name as keyof FormDataType];
      setFormData(newFormData);
      return;
    }

    numValue = Math.round(numValue / 10000) * 10000;

    if (numValue < 50000) numValue = 50000;
    if (numValue > 500000) numValue = 500000;

    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);

    if (formattedValue) {
      setValue(formattedValue);
      setFormData({ ...formData, [name]: formattedValue });
    }
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <div className='shadow-lg'>
      <label htmlFor={formatId} className='block mb-2 text-sm font-medium text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
      </label>
      <input
        id={formatId}
        pattern={pattern}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className='form-input focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white'
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete='no'
        value={value}
      />
    </div>
  );
};

export default TextInput;
