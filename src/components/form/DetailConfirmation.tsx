import React from 'react';
import { ShadowDiv, MainLabel, MainLabelSpan, SubLabel, SubLabelSpan } from '@/components/TailwindStyled';
import type { DetailConfirmationProps } from '../../types/formData';

const DetailConfirmation: React.FC<DetailConfirmationProps> = ({
  id,
  detail,
  labelName,
  name,
  error = false,
  additional = false,
}) => {
  const textColor = error ? 'text-orange-400 cursor-pointer' : 'text-white cursor-default';
  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : id.toString();

  if (!error) {
    return (
      <ShadowDiv>
        <MainLabelSpan className={textColor}>{labelName}</MainLabelSpan>
        <SubLabelSpan id={formatId} className={textColor}>
          {detail}
        </SubLabelSpan>
      </ShadowDiv>
    );
  }

  return (
    <ShadowDiv>
      <MainLabel className={textColor} htmlFor={name}>
        {labelName}
      </MainLabel>
      <SubLabel id={formatId} htmlFor={name} className={textColor}>
        {detail}
      </SubLabel>
    </ShadowDiv>
  );
};

export default DetailConfirmation;
