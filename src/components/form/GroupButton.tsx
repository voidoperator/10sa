import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
import type { FormDataType, GroupButtonProps } from '../../types/formData';

const GroupButton: React.FC<GroupButtonProps> = ({ labelName, name, id, defaultOption, options, required = false }) => {
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
    <div>
      <span className='block mb-2 text-sm font-medium text-white cursor-default'>
        {labelName}
        {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
      </span>
      <div className='flex items-center justify-center'>
        {options.map((option, index) => {
          const { label, value } = option;
          const leftRightStyle = index ? 'rounded-r-3xl border' : 'rounded-l-3xl border';
          const defaultOptionStyle = value === defaultOption ? 'bg-10sa-gold/60' : 'bg-10sa-deep-purple';
          return (
            <button
              id={id + '_' + (index + 1)}
              key={value + (index + 1)}
              value={value}
              onClick={(e) => handleClick(e)}
              className={`${leftRightStyle} ${defaultOptionStyle} w-full hover:bg-10sa-gold/90 active:bg-10sa-gold/100 border-10sa-gold/25 text-white py-2 px-4 transition-all`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GroupButton;
