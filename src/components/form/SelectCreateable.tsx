import React from 'react';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { useFormData } from '../contexts/FormContext';
import { creatableStyles, MainLabel, RequiredSpan, ShadowDiv } from '@/components/TailwindStyled';
import type { OnChangeValue } from 'react-select';
import type { SelectCreateableProps, OptionTypes } from '@/types/formData';

const SelectCreateable: React.FC<SelectCreateableProps> = ({
  labelName,
  name,
  id,
  options,
  placeholder,
  required = true,
  additional = false,
  defaultOption = undefined,
  creatable = false,
}) => {
  const { formData, setFormData } = useFormData();

  const handleChange = (selectedOption: OnChangeValue<OptionTypes, false>) => {
    let value = selectedOption ? selectedOption.value : '';
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

  const defaultValue = defaultOption ? { label: defaultOption, value: defaultOption } : undefined;

  if (creatable)
    return (
      <ShadowDiv>
        <MainLabel htmlFor={formatId}>
          {labelName}
          {required && <RequiredSpan />}
        </MainLabel>
        <Creatable
          name={formatId}
          inputId={formatId}
          required={required}
          options={options}
          placeholder={placeholder}
          styles={creatableStyles}
          backspaceRemovesValue={true}
          closeMenuOnScroll={true}
          blurInputOnSelect={true}
          isClearable={true}
          isMulti={false}
          onChange={(e) => handleChange(e)}
          value={defaultValue}
          maxMenuHeight={500}
        />
      </ShadowDiv>
    );

  return (
    <ShadowDiv>
      <MainLabel htmlFor={formatId}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <Select
        name={formatId}
        inputId={formatId}
        required={required}
        options={options}
        placeholder={placeholder}
        styles={creatableStyles}
        backspaceRemovesValue={true}
        closeMenuOnScroll={true}
        blurInputOnSelect={true}
        isClearable={true}
        isMulti={false}
        onChange={(e) => handleChange(e)}
        value={defaultValue}
        maxMenuHeight={500}
      />
    </ShadowDiv>
  );
};

export default SelectCreateable;
