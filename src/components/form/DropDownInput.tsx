import React from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import type { DropDownInputProps, FormDataType } from '../../types/formData';

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
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
      </label>
      <select
        name={name}
        id={id}
        required={required}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className='bg-10sa-deep-purple border-10sa-gold/40 border text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white focus:ring-10sa-gold focus:border-10sa-gold'
        defaultValue={defaultOption}
        value={formData[name as keyof FormDataType] as string}
      >
        <option disabled>{defaultOption}</option>
        {options.map((option, index) => {
          return (
            <option key={option.value + (index + 1)} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDownInput;
