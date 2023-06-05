import React from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import type { DropDownInputProps } from '../../types/formdata';

const DropDownInput: React.FC<DropDownInputProps> = ({
  labelName,
  name,
  id,
  defaultOption,
  options,
  required = true,
}) => {
  const { formData, setFormData } = useFormData();
  return (
    <div className='shadow-lg'>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
        defaultValue={defaultOption}
      >
        <option disabled>{defaultOption}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownInput;
