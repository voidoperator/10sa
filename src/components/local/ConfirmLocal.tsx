import React from 'react';
import { ShadowDiv, MainLabel, MainLabelSpan, SubLabel, SubLabelSpan } from '@/components/TailwindStyled';
import type { ConfirmLocalProps } from '@/types/constantData';

const ConfirmLocal: React.FC<ConfirmLocalProps> = ({
  id,
  detail,
  labelName,
  name,
  error = false,
  additional = false,
}) => {
  const textColor = error ? 'text-red-500 font-bold cursor-pointer' : 'text-dp-text-primary cursor-default';
  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : id.toString();

  if (!error) {
    return (
      <div className='flex flex-col gap-1'>
        <MainLabelSpan className={textColor}>{labelName}</MainLabelSpan>
        <SubLabelSpan id={formatId} className={textColor}>
          {detail}
        </SubLabelSpan>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-1'>
      <MainLabel className={textColor} htmlFor={name}>
        {labelName}
      </MainLabel>
      <SubLabel id={formatId} htmlFor={name} className={textColor}>
        {detail}
      </SubLabel>
    </div>
  );
};

export default ConfirmLocal;
