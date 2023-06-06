import React, { useState } from 'react';
import { useFormData } from '../contexts/FormContext';
import type { DetailConfirmationProps } from '../../types/formData';

const DetailConfirmation: React.FC<DetailConfirmationProps> = ({ id, detail, labelName, error = false }) => {
  const textColor = error ? 'text-red-500 dark:text-red-500' : 'text-gray-900 dark:text-white';
  return (
    <div className='shadow-lg'>
      <label className={`${textColor} block mb-2 text-sm font-medium`}>{labelName}</label>
      <span
        id={id}
        className={`${textColor} focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400`}
      >
        {detail}
      </span>
    </div>
  );
};

export default DetailConfirmation;
