import React from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import type { RadioInputProps } from '../../types/formdata';

const RadioInput: React.FC<RadioInputProps> = ({ labelName, name, options, handleStateChange, required = true }) => {
  const { formData, setFormData } = useFormData();
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
      </label>
      {options.map((option, index) => (
        <div key={index} className='inline-flex items-center mr-4 rounded-full'>
          <input
            type='radio'
            id={`${name}${index}`}
            name={name}
            value={option.value.toString()}
            required={required}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            className='rounded-full w-4 h-4 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <label
            htmlFor={`${name}${index}`}
            className='rounded-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioInput;
