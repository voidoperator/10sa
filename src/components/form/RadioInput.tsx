import React, { useEffect } from 'react';
import { useFormData } from '../contexts/FormContext';
import tw from 'tailwind-styled-components';
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
    <div className='flex flex-col'>
      <div>
        <span id={formatId} className='cursor-default block mb-2 text-sm font-medium text-white'>
          {labelName}
          {required && <span className='ml-1 after:content-["*"] after:text-yellow-300/90' />}
        </span>
      </div>
      <div className={`flex ${rowOrCol === 'row' ? 'flex-row' : 'flex-col'} items-start rounded-full gap-3`}>
        {options.map((option, index) => (
          <div key={index}>
            <input
              key={`${name}_${index + 1}`}
              type='radio'
              id={`${name}_${index + 1}`}
              name={name}
              value={option.value.toString()}
              required={required}
              checked={option.value.toString() === formData[name as keyof FormDataType]}
              onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
              className='form-radio cursor-pointer rounded-full w-4 h-4 bg-gray-700 border-10sa-gold/50 focus:ring-10sa-gold focus:border-10sa-gold checked:fill-red-500'
            />
            <label
              htmlFor={`${name}_${index + 1}`}
              className='cursor-pointer rounded-full ml-2 text-sm font-medium text-gray-300'
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioInput;
