import React, { useEffect, useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import {
  MainLabelSpan,
  RadioInputWrapper,
  RadioContainer,
  RequiredSpan,
  RadioButton,
  RadioLabel,
  TextField,
} from '@/components/TailwindStyled';
import type { RadioInputProps, FormDataType } from '@/types/formData';

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
  showCustomOption = false,
}) => {
  const { formData, setFormData } = useFormData();
  const [customValue, setCustomValue] = useState<string>('');
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);

  useEffect(() => {
    if (!showCustomOption) return;
    if (formData.americo_premium === 'Other') {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setCustomValue('');
      setFormData((prevState) => ({ ...prevState, americo_premium_other: '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.americo_premium]);

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

  const handleOtherChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    value = value.replace(/[^0-9.]/g, '');
    let decimalPart = '';
    if (value.includes('.')) {
      const [integerPart, decimal] = value.split('.');
      decimalPart = '.' + decimal.substring(0, 2);
      value = integerPart;
    }
    if (value === '') {
      value = '';
    } else {
      const numericValue = Number(value);
      value = new Intl.NumberFormat('en-US').format(numericValue);
      value = `$${value}${decimalPart}`;
    }
    setCustomValue(value);
    setFormData((prevState) => ({ ...prevState, americo_premium_other: value }));
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
        {showOtherInput && (
          <TextField
            type='text'
            name={`${name}_other`}
            id={`${name}_other`}
            onChange={(e) => handleOtherChange(e)}
            value={formData.americo_premium_other || customValue}
            placeholder='Ex. $98.75'
          />
        )}
      </RadioContainer>
    </RadioInputWrapper>
  );
};

export default RadioInput;
