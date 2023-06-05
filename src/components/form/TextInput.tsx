import React, { useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import type { FormDataType, TextInputProps } from '../../types/formdata';

const TextInput: React.FC<TextInputProps> = ({
  labelName,
  placeholder,
  type,
  name,
  required = true,
  pattern = undefined,
  currency = false,
  phone = false,
  socialSecurity = false,
  driverLicense = false,
  height = false,
  weight = false,
  additional = false,
}) => {
  const [value, setValue] = useState('');
  const { formData, setFormData } = useFormData();

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
      const match = value.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
      if (match) {
        value = `${match[1]}-${match[2]}-${match[3]}`;
        value = value.replace(/-$/, '');
      }
    }

    if (driverLicense) {
      value = value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
      if (value.length > 12) {
        value = value.substring(0, 12);
      }
      const match = value.match(/^([a-zA-Z]{1})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,1})$/);
      if (match) {
        value = `${match[1] ? match[1] : ''}${match[2] ? match[2] : ''}${match[3] ? '-' + match[3] : ''}${
          match[4] ? '-' + match[4] : ''
        }${match[5] ? '-' + match[5] : ''}${match[6] ? '-' + match[6] : ''}`;
        value = value.trim().replace(/-$/, '');
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
    if (additional) {
      const dependentIndex = parseInt(labelName.split(' ')[1]) - 1;
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

  return (
    <div className='shadow-lg'>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
      </label>
      <input
        pattern={pattern}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        className='focus:rinasdfg-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
        onChange={handleChange}
        value={value}
        autoComplete='off'
      />
    </div>
  );
};

export default TextInput;
