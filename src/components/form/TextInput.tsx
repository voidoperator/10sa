import React, { useState } from 'react';

type TextInputProps = {
  labelName: string;
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
  pattern?: string;
  currency?: boolean;
  phone?: boolean;
  socialSecurity?: boolean;
  height?: boolean;
  weight?: boolean;
};

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
  height = false,
  weight = false,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (currency) {
      value = value.replace(/\D/g, '');
      const numericValue = Number(value);
      value = new Intl.NumberFormat('en-US').format(numericValue);
      value = `$${value}`;
    }

    if (phone) {
      value = value.replace(/\D/g, '');
      const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        value = `(${match[1]}) ${match[2]}-${match[3]}`;
      }
    }

    if (socialSecurity) {
      value = value.replace(/\D/g, '');
      const match = value.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
      if (match) {
        value = `${match[1]}-${match[2]}-${match[3]}`;
      }
    }

    if (height) {
      value = value.replace(/\D/g, '');
      const match = value.match(/^(\d{0,1})(\d{0,2})$/);
      if (match) {
        value = `${match[1]}'${match[2]}`;
      }
    }

    if (weight) {
      value = value.replace(/[^\d.]/g, ''); // Remove non-digit and non-decimal characters
      value += ' lbs'; // Append " lbs" to the value
    }

    setValue(value);
  };

  return (
    <div>
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
        className='focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;
