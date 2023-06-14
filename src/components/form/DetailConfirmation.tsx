import React from 'react';
import tw from 'tailwind-styled-components';
import { ShadowDiv } from '../tw/twStyles';
import type { DetailConfirmationProps } from '../../types/formData';

const MainLabel = tw.label`
  block mb-2 text-sm font-medium
`;
const SubLabel = tw.label`
  focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400
`;

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
