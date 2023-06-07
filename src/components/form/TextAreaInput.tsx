import React from 'react';
import { useFormData } from '../contexts/FormContext';
import type { TextAreaProps } from '../../types/formData';
import tw from 'tailwind-styled-components';

const TextAreaInput: React.FC<TextAreaProps> = ({ labelName, placeholder, name, required = true, rows = 4 }) => {
  const { formData, setFormData } = useFormData();
  return (
    <div className='shadow-lg'>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className='focus:ring-10sa-gold focus:border-10sa-gold block p-2.5 w-full text-sm rounded-lg border bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white'
        autoComplete='no'
      />
    </div>
  );
};

export default TextAreaInput;
