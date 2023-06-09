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
  const textColor = error ? 'text-red-500' : 'text-white';
  const formatId = additional && typeof id === 'number' ? name + '_' + (id + 1) : name;

  return (
    <div className='shadow-lg'>
      <label className={`${textColor} block mb-2 text-sm font-medium`} htmlFor={error ? name : ''}>
        {labelName}
      </label>
      <span
        id={formatId}
        className={`${textColor} focus:ring-10sa-gold focus:border-10sa-gold border text-sm rounded-lg block w-full p-2.5 bg-10sa-deep-purple border-10sa-gold/40 placeholder-gray-400`}
      >
        {detail}
      </span>
    </div>
  );
};

export default DetailConfirmation;
