import React, { useEffect, useState } from 'react';
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
  additional = false,
}) => {
  const { formData, setFormData } = useFormData();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        id={formatId}
        name={name}
        required={required}
        onChange={handleChange}
        className='form-select bg-10sa-deep-purple border-10sa-gold/40 border text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white focus:ring-10sa-gold focus:border-10sa-gold'
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
