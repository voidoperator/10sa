import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import { ShadowDiv, MainLabel, RequiredSpan, Select } from '../tw/twStyles';
import type { DropDownInputProps, FormDataType, InsuredList } from '../../types/formData';

// const MainLabel = tw.label`
//   block mb-2 text-sm font-medium text-white
// `;
// const RequiredSpan = tw.span`
//   ml-1 after:content-["*"] after:text-yellow-300/90
// `
// const Select = tw.select`
//   form-select bg-10sa-deep-purple border-10sa-gold/40 border text-sm rounded-lg block w-full p-2.5 placeholder-gray-400 text-white focus:ring-10sa-gold focus:border-10sa-gold
// `

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
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  const formatValue =
    additional && typeof id === 'number'
      ? (formData.additional_insured_list[id][name as keyof InsuredList] as string)
      : (formData[name as keyof FormDataType] as string);

  return (
    <ShadowDiv>
      <MainLabel htmlFor={formatId}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <Select id={formatId} name={name} required={required} onChange={handleChange} value={formatValue || ''}>
        <option value='' disabled>
          {defaultOption}
        </option>
        {options.map((option, index) => {
          const { label, value } = option;
          return (
            <option key={value + (index + 1)} value={value}>
              {label}
            </option>
          );
        })}
      </Select>
    </ShadowDiv>
  );
};

export default DropDownInput;
