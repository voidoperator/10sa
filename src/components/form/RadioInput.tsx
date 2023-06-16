import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import {
  MainLabelSpan,
  RadioLabelContainer,
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
      setFormData({ ...formData, [name]: defaultOption });
    }
  }, [defaultOption, formData, name, setFormData]);

  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <RadioLabelContainer>
      <div>
        <MainLabelSpan id={formatId}>
          {labelName}
          {required && <RequiredSpan />}
        </MainLabelSpan>
      </div>
      <RadioContainer className={rowOrCol === 'row' ? 'flex-row' : 'flex-col'}>
        {options.map((option, index) => {
          const { label, value } = option;
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
                onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              />
              <RadioLabel htmlFor={`${name}_${index + 1}`}>{label}</RadioLabel>
            </div>
          );
        })}
      </RadioContainer>
    </RadioLabelContainer>
  );
};

export default RadioInput;
