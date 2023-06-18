import React from 'react';
import Creatable from 'react-select/creatable';
import { useFormData } from '../contexts/FormContext';
import { MainLabel, RequiredSpan, ShadowDiv } from '../tw/twStyles';
import type { SelectCreateableProps, OptionTypes } from '../../types/formData';
import type { OnChangeValue, StylesConfig } from 'react-select';

const creatableStyles: StylesConfig<OptionTypes> = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgba(80, 49, 88, 1)',
    borderColor: state.isFocused ? 'rgba(189, 164, 114, 0.4)' : 'rgba(189, 164, 114, 0.4)',
    borderRadius: '0.5rem',
    color: '#FFFFFF',
    fontSize: '0.875rem',
    margin: '0px',
    boxShadow: state.isFocused
      ? 'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) rgba(189, 164, 114, 1)'
      : '',
    '&:hover': {
      borderColor: 'rgba(189, 164, 114, 0.4)',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(156, 163, 175, 1)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  menu: (provided) => ({
    ...provided,
    background: 'rgba(80, 49, 88, 1)',
    borderRadius: '0.5rem',
    margin: '0px',
    padding: '0px',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'rgba(189, 164, 114, 0.4)' : '#FFFFFF',
    backgroundColor: state.isFocused ? 'rgba(189, 164, 114, 0.4)' : '',
  }),
  input: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
};

const SelectCreateable: React.FC<SelectCreateableProps> = ({
  labelName,
  name,
  id,
  options,
  placeholder,
  required = true,
  additional = false,
  defaultOption = undefined,
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

  return (
    <ShadowDiv>
      <MainLabel htmlFor={formatId}>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabel>
      <Creatable
        options={options}
        placeholder={placeholder}
        inputId={formatId}
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
