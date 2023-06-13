import React from 'react';
import { useFormData } from '../contexts/FormContext';
import type { TextAreaProps } from '../../types/formData';
import tw from 'tailwind-styled-components';

const TextAreaInput: React.FC<TextAreaProps> = ({
  id,
  labelName,
  placeholder,
  name,
  required = false,
  rows = 4,
  additional = false,
}) => {
  const { formData, setFormData } = useFormData();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
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

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <div className='shadow-lg'>
      <label htmlFor={formatId} className='block mb-2 text-sm font-medium text-white'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
      </label>
      <textarea
        id={formatId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        className='form-textarea focus:ring-10sa-gold focus:border-10sa-gold block p-2.5 w-full text-sm rounded-lg border bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400 text-white'
        autoComplete='no'
      />
    </div>
  );
};

export default TextAreaInput;
