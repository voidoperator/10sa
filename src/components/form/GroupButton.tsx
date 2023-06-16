import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import { RequiredSpan, ShadowDiv, MainLabelSpan, GroupButtonContainer, GroupButtonButton } from '../tw/twStyles';
import type { FormDataType, GroupButtonProps } from '../../types/formData';

const GroupButton: React.FC<GroupButtonProps> = ({ labelName, name, id, defaultOption, options, required = true }) => {
  const { formData, setFormData } = useFormData();

  useEffect(() => {
    if (defaultOption && !formData[name as keyof FormDataType]) {
      setFormData({ ...formData, [name]: defaultOption });
    }
  }, [defaultOption, formData, name, setFormData]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    options.forEach((_, index) => {
      const button = document.getElementById(id + '_' + (index + 1));
      if (button && button !== event.target) {
        button.classList.remove('bg-10sa-gold/60');
        button.classList.add('bg-10sa-deep-purple');
      }
    });
    target.classList.remove('bg-10sa-deep-purple');
    target.classList.add('bg-10sa-gold/60');
    setFormData({ ...formData, [name]: target.value });
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
          const defaultOptionStyle = value === defaultOption ? 'bg-10sa-gold/60' : 'bg-10sa-deep-purple';
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
