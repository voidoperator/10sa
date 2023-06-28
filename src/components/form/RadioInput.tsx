import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import {
  MainLabelSpan,
  RadioInputWrapper,
  RadioContainer,
  RequiredSpan,
  RadioButton,
  RadioLabel,
} from '@/components/TailwindStyled';
import type { RadioInputProps, FormDataType } from '../../types/formData';

const RadioInput: React.FC<RadioInputProps> = ({
  labelName,
  index,
  name,
  id,
  options,
  required = true,
  rowOrCol = 'row',
  defaultOption,
  additional = false,
}) => {
  const { formData, setFormData } = useFormData();

  useEffect(() => {
    if (defaultOption && !formData[name as keyof FormDataType]) {
      setFormData((prevState) => ({ ...prevState, [name]: defaultOption }));
    }
  }, [defaultOption, formData, name, setFormData]);

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (!additional) {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
      return;
    }
    if (additional && typeof id === 'number') {
      const dependentIndex = id;
      let additionalInsuredList = formData.additional_insured_list || [];
      additionalInsuredList[dependentIndex] = {
        ...additionalInsuredList[dependentIndex],
        [name]: value,
      };
      setFormData((prevState) => ({ ...prevState, additional_insured_list: additionalInsuredList }));
      return;
    }
  };

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <RadioInputWrapper>
      <div>
        <MainLabelSpan id={formatId}>
          {labelName}
          {required && <RequiredSpan />}
        </MainLabelSpan>
      </div>
      <RadioContainer className={rowOrCol === 'row' ? 'flex-row' : 'flex-col'}>
        {options.map((option, i) => {
          const { label, value, disabled = false } = option;
          const uniqueId = additional ? `${name}_${index}_${i + 1}` : `${name}_${index}_${i + 1}`;
          let isChecked = false;
          if (additional && typeof id === 'number') {
            isChecked = value.toString() === (formData.additional_insured_list[id] as any)[name];
          } else {
            isChecked = value.toString() === formData[name as keyof FormDataType];
          }
          return (
            <div key={`${name}_${i}`}>
              <RadioButton
                id={uniqueId}
                name={name}
                type='radio'
                value={value.toString()}
                required={required}
                checked={isChecked}
                onChange={(e) => handleChange(e)}
                disabled={disabled}
              />
              <RadioLabel htmlFor={uniqueId}>{label}</RadioLabel>
            </div>
          );
        })}
      </RadioContainer>
    </RadioInputWrapper>
  );
};

export default RadioInput;
