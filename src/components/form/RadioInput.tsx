import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import {
  MainLabelSpan,
  RadioInputWrapper,
  RadioContainer,
  RequiredSpan,
  RadioButton,
  RadioLabel,
} from '../tw/twStyles';
import type { RadioInputProps, FormDataType } from '../../types/formData';

const RadioInput: React.FC<RadioInputProps> = ({
  labelName,
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
        {options.map((option, index) => {
          const { label, value, disabled = false } = option;
          const disabledClasses = 'disabled:text-gray-500';
          return (
            <div key={index}>
              <RadioButton
                key={`${name}_${index + 1}`}
                type='radio'
                id={`${name}_${index + 1}`}
                name={name}
                value={value.toString()}
                required={required}
                checked={value.toString() === formData[name as keyof FormDataType]}
                onChange={(e) => setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))}
                disabled={disabled}
              />
              <RadioLabel htmlFor={`${name}_${index + 1}`}>{label}</RadioLabel>
            </div>
          );
        })}
      </RadioContainer>
    </RadioInputWrapper>
  );
};

export default RadioInput;
