import React from 'react';
import tw from 'tailwind-styled-components';

type RadioInputProps = {
  labelName: string;
  name: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

const RadioInput: React.FC<RadioInputProps> = ({ labelName, name, options, required = true }) => {
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
            value={option.value}
            required={required}
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
