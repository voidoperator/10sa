import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import {
  RequiredSpan,
  ShadowDiv,
  MainLabelSpan,
  GroupButtonContainer,
  GroupButtonButton,
} from '@/components/TailwindStyled';
import type { FormDataType, GroupButtonProps } from '@/types/formData';

const GroupButton: React.FC<GroupButtonProps> = ({ labelName, name, id, defaultOption, options, required = true }) => {
  const { formData, setFormData } = useFormData();

  useEffect(() => {
    if (defaultOption && !formData[name as keyof FormDataType]) {
      setFormData((prevState) => ({ ...prevState, [name]: defaultOption }));
    }
  }, [defaultOption, formData, name, setFormData]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const { value } = target;
    options.forEach((_, index) => {
      const button = document.getElementById(id + '_' + (index + 1));
      if (button && button !== event.target) {
        button.classList.remove('bg-blue-500');
        button.classList.add('bg-dp-secondary');
      }
    });
    target.classList.remove('bg-dp-secondary');
    target.classList.add('bg-blue-500');
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <ShadowDiv>
      <MainLabelSpan>
        {labelName}
        {required && <RequiredSpan />}
      </MainLabelSpan>
      <GroupButtonContainer>
        {options.map((option, index) => {
          const { label, value } = option;
          const leftRightStyle = index ? 'rounded-r-3xl border' : 'rounded-l-3xl border';
          const defaultOptionStyle = value === defaultOption ? 'bg-blue-500 text-dp-text-secondary' : 'bg-dp-secondary';
          return (
            <GroupButtonButton
              id={id + '_' + (index + 1)}
              key={value + (index + 1)}
              value={value}
              onClick={(e) => handleClick(e)}
              className={`${leftRightStyle} ${defaultOptionStyle}`}
            >
              {label}
            </GroupButtonButton>
          );
        })}
      </GroupButtonContainer>
    </ShadowDiv>
  );
};

export default GroupButton;
