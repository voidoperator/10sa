import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import { MainLabel, RequiredSpan, ShadowDiv, TextArea } from '../tw/twStyles';
import type { TextAreaProps } from '../../types/formData';

const TextAreaInput: React.FC<TextAreaProps> = ({
  id,
  labelName,
  placeholder,
  name,
  required = true,
  rows = 4,
  additional = false,
  useDefault = true,
  defaultKey = '',
  defaultValue = '',
}) => {
  const { formData, setFormData } = useFormData();
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (!additional && useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      setFormData((prevState) => ({ ...prevState, [defaultKey]: defaultValue }));
    }
    if (additional && typeof id === 'number' && useDefault && defaultKey && defaultValue && value === '') {
      setValue(defaultValue);
      const dependentIndex = id;
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [defaultKey]: defaultValue,
      };
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
    }
  }, [useDefault, defaultKey, defaultValue, value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;
    setValue(value);
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

  return (
    <ShadowDiv>
      <MainLabel htmlFor={formatId}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <TextArea
        id={formatId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        autoComplete='no'
        value={value}
      />
    </ShadowDiv>
  );
};

export default TextAreaInput;
