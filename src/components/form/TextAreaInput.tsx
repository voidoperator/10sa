import React from 'react';
import { useFormData } from '../contexts/FormContext';
import type { TextAreaProps } from '../../types/formData';
import tw from 'tailwind-styled-components';

const TextAreaInput: React.FC<TextAreaProps> = ({ labelName, placeholder, name, required = true, rows = 4 }) => {
  const { formData, setFormData } = useFormData();
  return (
    <div className='shadow-lg'>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-gray-900 after:dark:text-gray-300' />}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className='focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 block p-2.5 w-full text-sm rounded-lg border border-gray-300 bg-[#503158] border-[#bda472]/40 placeholder-gray-400 text-white'
        autoComplete='no'
      />
    </div>
  );
};

export default TextAreaInput;
