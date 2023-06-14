import React, { useState } from 'react';
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

  return (
    <div className='shadow-lg'>
      <label className={`${textColor} block mb-2 text-sm font-medium`} htmlFor={name}>
        {labelName}
      </label>
      <label
        id={formatId}
        htmlFor={name}
        className={`${textColor} focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400`}
      >
        {detail}
      </label>
    </div>
  );
};

export default DetailConfirmation;
